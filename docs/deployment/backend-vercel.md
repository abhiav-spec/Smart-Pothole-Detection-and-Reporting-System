# Deploy the backend to Vercel

This guide deploys `apps/backend` as an Express Vercel Function. The application already exports the Express app from `src/app.js`; Vercel supports that layout directly.

The backend has a build command that generates Prisma Client before deployment. The production AI endpoint is configured in Vercel as an environment variable, not committed to Git.

## Important upload limit

Vercel Functions accept request bodies up to 4.5 MB. This backend currently receives a multipart file at `POST /api/media/upload`, so configure `MAX_FILE_SIZE_MB=4` in Vercel and use compressed images smaller than 4 MB for the demonstration.

Large photos and normal video files will fail before reaching this backend. Full video support needs a separate follow-up: either direct client-to-storage uploads with a backend callback, or hosting the backend on a service without Vercel's 4.5 MB function request limit. Do not use a larger value for `MAX_FILE_SIZE_MB` on Vercel because Vercel will return HTTP 413 first.

## 1. Prepare external services

Before creating the Vercel project, have these values ready:

- A Neon PostgreSQL connection string. Use its pooled connection string for `DATABASE_URL` and the direct connection string for `DIRECT_URL`.
- ImageKit public key, private key, and URL endpoint.
- The final frontend deployment origin, such as `https://your-frontend.vercel.app`, for `FRONTEND_URL`.

Generate two different JWT secrets locally. Each must be at least 32 characters:

```bash
openssl rand -base64 48
```

## 2. Create the Vercel backend project

1. In Vercel, select **Add New** → **Project** and import `abhiav-spec/Smart-Pothole-Detection-and-Reporting-System`.
2. Set **Root Directory** to `apps/backend`.
3. Select **Express** (or **Other** if Express is not offered).
4. Use Node.js `22.x`.
5. Keep the install command as `npm ci` and set the build command to `npm run build`.
6. Leave the output directory empty. This is an API service, not a static site.
7. Add all Production environment variables below before selecting **Deploy**.

## 3. Add Vercel environment variables

Add these under **Project Settings** → **Environment Variables**. Apply the production values to **Production**; add the same non-secret values to **Preview** only if you plan to use preview deployments.

| Key | Production value |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Neon pooled PostgreSQL connection string |
| `DIRECT_URL` | Neon direct PostgreSQL connection string |
| `FRONTEND_URL` | Final frontend origin, for example `https://your-frontend.vercel.app` |
| `JWT_ACCESS_SECRET` | First generated secret (32+ characters) |
| `JWT_REFRESH_SECRET` | Second generated secret (32+ characters) |
| `JWT_ACCESS_EXPIRES_IN` | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | `7d` |
| `AI_SERVICE_URL` | `https://smart-pothole-detection-and-reporting.onrender.com` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint, such as `https://ik.imagekit.io/your_imagekit_id` |
| `MAX_FILE_SIZE_MB` | `4` |
| `LOG_LEVEL` | `info` |

Do not add an `.env` file to GitHub or Vercel's source upload. Enter the values in Vercel only. After changing any variable, redeploy because Vercel applies variable changes to new deployments.

## 4. Verify the backend

After deployment, replace `YOUR-BACKEND` below with the Vercel deployment hostname:

```text
https://YOUR-BACKEND.vercel.app/health
https://YOUR-BACKEND.vercel.app/api/health
```

Both must return a successful JSON health response. The deployed backend's AI client has been verified against the configured Render URL through `GET /health`; no image or video was submitted during that verification.

## 5. Connect the frontend after the backend is live

In the frontend Vercel project, set:

```text
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.vercel.app/api
```

Then confirm the backend project's `FRONTEND_URL` is the exact deployed frontend origin and redeploy both projects. This is configuration only; it does not require a frontend design change.
