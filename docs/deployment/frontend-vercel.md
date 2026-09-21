# Deploy the frontend to Vercel

This deploys the existing Next.js frontend from `apps/frontend`. No frontend design or UI code is changed for deployment.

The backend is deployed and verified at:

```text
https://smart-pothole-detection-and-reporti.vercel.app
```

## 1. Create the Vercel frontend project

1. In Vercel, select **Add New** → **Project** and import `abhiav-spec/Smart-Pothole-Detection-and-Reporting-System`.
2. Give the project a distinct frontend name, for example `abhiav-smart-pothole-ai`.
3. Set **Root Directory** to `apps/frontend`.
4. Select **Next.js** as the Framework Preset.
5. Use Node.js `22.x`.
6. Set **Install Command** to `npm ci`.
7. Set **Build Command** to `npm run build`.
8. Leave **Output Directory** empty. Do not enter `public`.

## 2. Add the frontend environment variable

In **Settings** → **Environment Variables**, add this Production value before deployment:

```text
NEXT_PUBLIC_API_URL=https://smart-pothole-detection-and-reporti.vercel.app/api
```

This is a public browser configuration value, not a secret. Do not add database URLs, JWT secrets, or ImageKit private keys to the frontend project.

## 3. Deploy and connect CORS

1. Select **Deploy**.
2. Copy the resulting frontend URL, for example `https://abhiav-smart-pothole-ai.vercel.app`.
3. Open the existing backend Vercel project → **Settings** → **Environment Variables**.
4. Update `FRONTEND_URL` to that exact frontend URL, without a trailing path.
5. Redeploy the backend so it permits browser requests from the deployed frontend.

## 4. Verify

Open the frontend URL. The site should load normally, and its report, map, and dashboard requests will use the deployed backend through `NEXT_PUBLIC_API_URL`.

If you change `NEXT_PUBLIC_API_URL`, redeploy the frontend because Next.js embeds `NEXT_PUBLIC_*` values during its build.
