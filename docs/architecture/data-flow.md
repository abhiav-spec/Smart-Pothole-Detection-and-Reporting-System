# Smart Pothole Detection & Reporting System — Data Flow Specifications

## 1. High-Level Data Ingestion & Processing Flow

The system processes citizen reports through a 6-stage data flow pipeline:

```text
[Citizen Mobile / Web App]
         │
         │ (1) Multipart Form (Image + Lat/Lng)
         ▼
[Express Gateway & Auth Pipeline]
         │
         ├──────────────────────────┐
         │ (2) Raw Image Buffer      │ (3) Multipart Image Payload
         ▼                          ▼
[ImageKit Storage Service]    [FastAPI YOLOv8 AI Service]
         │                          │
         │ CDN URL & File ID        │ Bounding Boxes & Confidence
         └──────────┬───────────────┘
                    │
                    ▼
       [Deduplication & Severity Engine]
                    │
                    │ Spatial Proximity (Haversine <= 15m)
                    ▼
       [Neon Serverless PostgreSQL DB]
                    │
                    │ Real-time Queries & Webhooks
                    ▼
       [Municipal Dashboard & Map UI]
```

---

## 2. Step-by-Step Execution Sequence

### Step 1: Client Request Ingestion
- **Protocol**: HTTP/2 or HTTP/1.1 POST over TLS.
- **Route**: `POST /api/media/upload`
- **Headers**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`, `Content-Type: multipart/form-data`
- **Body**:
  - `file`: Binary image file (JPEG, PNG, WebP format, max size: 50MB).
  - `latitude`: Floating-point latitude (e.g. `28.6139`).
  - `longitude`: Floating-point longitude (e.g. `77.2090`).
  - `description`: Optional text description.

### Step 2: Security & Validation Pipeline
1. **Pino Request Logger**: Generates unique `x-request-id` UUID for correlation across log streams.
2. **Helmet & CORS**: Validates request headers and allowed origin.
3. **Rate Limiting**: `uploadRateLimiter` enforces strict quotas per IP.
4. **JWT Authentication**: Decoding access token, fetching user identity from DB, attaching to `req.user`.
5. **Location Validator**: Validates coordinate ranges (`latitude` between -90 and 90, `longitude` between -180 and 180).

### Step 3: Cloud Storage Upload (ImageKit Integration)
- The raw file buffer stored in RAM by `Multer` is dispatched asynchronously to ImageKit SDK:
  - **Folder**: `/potholes/images/`
  - **Filename Pattern**: `test_<RANDOM_SUFFIX>.<EXT>`
- **Response**:
  - `url`: `https://ik.imagekit.io/<imagekit_id>/potholes/images/...`
  - `fileId`: String identifier in ImageKit for subsequent deletions/transformations.

### Step 4: AI Model Inference (FastAPI YOLOv8 Integration)
- Backend sends HTTP POST request to FastAPI microservice at `http://127.0.0.1:8000/predict`.
- **Inference Pipeline**:
  - Image decoded into OpenCV / PyTorch Tensor format.
  - YOLOv8 object detection model identifies road surface defects.
  - Bounding box coordinates `[x_min, y_min, x_max, y_max]`, confidence score, and class label returned.

### Step 5: Spatial Deduplication & Severity Matrix
1. **Haversine Distance Metric**:
   $$\text{distance} = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$
2. **Deduplication Threshold**:
   - Search database for existing potholes within **15 meters radius**.
   - If match found: Append image to existing `Pothole` record, increment report count.
   - If no match found: Create new `Pothole` record.
3. **Severity Calculation**:
   - **LOW**: Confidence < 0.40 or single small defect.
   - **MEDIUM**: Confidence 0.40–0.60 or moderate size.
   - **HIGH**: Confidence 0.60–0.75 or multiple defects.
   - **CRITICAL**: Confidence > 0.75 or large road surface area defect.

### Step 6: Atomic Database Transaction
Using Prisma ORM, all entities are persisted inside an atomic `$transaction`:
- Insert/Update `Pothole` row.
- Insert `Media` row linked to `Pothole`.
- Insert `Detection` row linked to `Pothole`.
- Insert `Report` row linked to `User` and `Pothole`.

---

## 3. Status Lifecycle State Machine

```text
               ┌───────────────┐
               │   REPORTED    │
               └───────┬───────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
 ┌───────────────┐           ┌───────────────┐
 │   VERIFIED    │           │   REJECTED    │
 └───────┬───────┘           └───────────────┘
         │
         ▼
 ┌───────────────┐
 │   ASSIGNED    │
 └───────┬───────┘
         │
         ▼
 ┌───────────────┐
 │  IN_PROGRESS  │
 └───────┬───────┘
         │
         ▼
 ┌───────────────┐
 │   RESOLVED    │
 └───────────────┘
```

Every status transition automatically creates an append-only row in `PotholeStatusHistory` containing:
- `potholeId`
- `oldStatus`
- `newStatus`
- `changedById` (User ID of Authority or Admin)
- `reason` (Optional explanation)
- `createdAt` timestamp
