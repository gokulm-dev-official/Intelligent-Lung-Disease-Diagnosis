# Deployment Guide for Lung Disease Diagnosis System

This project is configured for a MERN Monorepo deployment on **Vercel**.

## 1. Database Setup (MongoDB Atlas)
Since you are currently using a local MongoDB, you need to migrate to a cloud database:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster and get your **Connection String**.
3. Allow access from `0.0.0.0/0` (anywhere) in the Network Access settings.

## 2. Python AI Service (Optional but Recommended)
The AI prediction part runs on a Python service. Vercel does not support long-running Python processes well.
1. Deploy the `python_service` folder to [Render](https://render.com) or [Railway](https://railway.app).
2. Note the live URL of your Python service.

## 3. Vercel Deployment
1. Go to [Vercel](https://vercel.com) and click **"New Project"**.
2. Import your GitHub repository: `Intelligent-Lung-Disease-Diagnosis`.
3. Vercel will automatically detect the `vercel.json` configuration.
4. **Environment Variables:** You MUST add these in the Vercel Dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: (Leave blank if using the same domain, or set to your Vercel URL + `/api`).
   - `PYTHON_SERVICE_URL`: URL of your deployed Python service (from step 2).

## 4. Limitations on Vercel
- **File Storage:** File uploads (X-rays) and PDF reports are stored in local folders (`/uploads`, `/reports`). Vercel has a read-only file system. 
- **Recommendation:** For a production app, use **Cloudinary** for image storage and **AWS S3** for PDFs.
- **Fallback:** Currently, the system will fallback to a deterministic "Dummy AI" result if the Python service is not reachable.

## Next Steps
- Link your GitHub repo to Vercel now!
- Update the environment variables as shown above.
