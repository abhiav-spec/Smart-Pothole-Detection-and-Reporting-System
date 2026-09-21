# Deploy the AI service to Render

This repository includes `render.yaml`, which deploys only the FastAPI/YOLOv8 service from `apps/ai-service`. It uses the existing Dockerfile and includes the tracked model at `models/pothole/best.pt`.

## Before you begin

- Push the repository to GitHub.
- Create or sign in to a Render account.
- Use the same GitHub repository and select the `main` branch.

## Deploy with the Blueprint

1. In Render, select **New** → **Blueprint**.
2. Connect `abhiav-spec/Smart-Pothole-Detection-and-Reporting-System`.
3. Keep `render.yaml` as the Blueprint path.
4. Review the `smart-pothole-ai` web service, then select **Apply**.
5. Wait for the Docker build and deploy to finish. Render provides a URL similar to `https://smart-pothole-ai.onrender.com`.

The Docker command listens on Render's injected `PORT`; it uses port `8000` only for local Docker use. Render performs its health check at `/health`.

## Verify the deployment

Open the following URL in a browser:

```text
https://YOUR-RENDER-SERVICE.onrender.com/health
```

Expected response:

```json
{"status":"ok"}
```

Then test image inference with a small JPEG. The multipart field name must be `image`:

```bash
curl -X POST "https://YOUR-RENDER-SERVICE.onrender.com/detect/image" \
  -F "image=@test_potholes.jpeg"
```

The first inference can take longer because the YOLO model loads into memory. For a free Render service, use images or very short videos for demonstrations; long videos can exceed available CPU or memory.

## Connect the backend after AI verification

In the backend deployment environment, set:

```text
AI_SERVICE_URL=https://YOUR-RENDER-SERVICE.onrender.com
```

Deploy the backend only after `/health` and `/detect/image` work on Render. The backend calls the AI service server-to-server, so no browser CORS configuration is required for the AI URL.
