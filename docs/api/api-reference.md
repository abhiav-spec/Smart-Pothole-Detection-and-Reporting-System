# Smart Pothole Detection & Reporting System — API Reference Document

Base URL: `http://localhost:5000/api`

---

## 1. Authentication APIs (`/api/auth`)

### 1.1 Register User
- **POST** `/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123!",
  "role": "USER"
}
```
- **Response** (`201 Created`):
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid-v4-string",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "USER"
    },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

### 1.2 User Login
- **POST** `/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "Password123!"
}
```
- **Response** (`200 OK`): Return user details & fresh access/refresh token pair.

### 1.3 Refresh Access Token
- **POST** `/auth/refresh`
- **Access**: Public
- **Request Body**:
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```
- **Response** (`200 OK`): Returns new `accessToken`.

### 1.4 User Logout
- **POST** `/auth/logout`
- **Access**: Protected (Bearer Token)
- **Response** (`200 OK`): Invalidates session.

---

## 2. Pothole APIs (`/api/potholes`)

### 2.1 List Potholes (With Filters & Pagination)
- **GET** `/potholes`
- **Access**: Public
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `status` (`REPORTED` | `VERIFIED` | `ASSIGNED` | `IN_PROGRESS` | `RESOLVED` | `REJECTED`)
  - `severity` (`LOW` | `MEDIUM` | `HIGH` | `CRITICAL`)
  - `authorityId` (UUID string)
  - `startDate` (ISO 8601 string)
  - `endDate` (ISO 8601 string)
  - `search` (Search string in description)
  - `sortBy` (`createdAt` | `severity` | `status`, default: `createdAt`)
  - `sortOrder` (`asc` | `desc`, default: `desc`)
- **Response** (`200 OK`):
```json
{
  "status": "success",
  "data": {
    "potholes": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    }
  }
}
```

### 2.2 Get Pothole Details
- **GET** `/potholes/:id`
- **Access**: Public
- **Response** (`200 OK`): Pothole record with linked `media`, `detections`, `reports`, `statusHistory`, and `authority`.

### 2.3 Update Pothole Status
- **PATCH** `/potholes/:id/status`
- **Access**: Protected (`AUTHORITY`, `ADMIN`)
- **Request Body**:
```json
{
  "status": "VERIFIED",
  "reason": "Inspected on site by city engineer"
}
```
- **Response** (`200 OK`): Updated pothole record & audit history item created.

---

## 3. Media & Upload APIs (`/api/media`)

### 3.1 Upload Pothole Image
- **POST** `/media/upload`
- **Access**: Protected (`USER`, `AUTHORITY`, `ADMIN`)
- **Headers**: `Content-Type: multipart/form-data`
- **Form Fields**:
  - `file`: Image binary
  - `latitude`: `28.6139`
  - `longitude`: `77.2090`
  - `description`: "Large pothole in center lane"
- **Response** (`201 Created`):
```json
{
  "status": "success",
  "data": {
    "pothole": {
      "id": "acc7d469-b0f7-4aca-a7c9-bdbf749200b0",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "severity": "CRITICAL",
      "status": "REPORTED",
      "confidence": 0.7822
    },
    "media": {
      "id": "cc3ec145-9449-4608-bdaf-30dae8b86b20",
      "url": "https://ik.imagekit.io/mvo3mhfdg/potholes/images/test_g2BaQbkXY.jpg",
      "fileId": "6aa59ba1ead997d09a78ee6b"
    },
    "aiPredictions": {
      "hasPothole": true,
      "confidence": 0.7822,
      "detections": [...]
    }
  }
}
```

---

## 4. Dashboard APIs (`/api/dashboard`)

### 4.1 Overview Statistics
- **GET** `/dashboard/overview`
- **Access**: Protected
- **Response**: Aggregated counts, status distribution, severity breakdown.

### 4.2 Geo-Spatial Map Points
- **GET** `/dashboard/map`
- **Access**: Public
- **Response**: Array of pothole coordinates (`latitude`, `longitude`, `severity`, `status`, `id`).

### 4.3 Authority Performance Stats
- **GET** `/dashboard/authorities`
- **Access**: Protected
- **Response**: List of authorities with assigned, resolved, and pending pothole counts.
