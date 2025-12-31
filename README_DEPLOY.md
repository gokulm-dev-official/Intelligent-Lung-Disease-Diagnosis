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

## 3. **PYTHON_SERVICE_URL**: The URL of your Render service (e.g., `https://intelligent-lung-disease-diagnosis.onrender.com`). **Do not add a trailing slash.**

## 4. Troubleshooting Analysis
If the analysis still fails:
- **Render RAM**: TensorFlow is heavy. If the Render logs say "Out of Memory", it means the free tier isn't enough. The system will try to "Simulate" the AI result if the service is down.
- **Vercel Timeout**: Vercel free tier has a 10-second timeout. If the AI takes longer, it will fail.
- **Check Logs**: Go to Vercel Dashboard -> Logs to see exactly what "Backend Error" is being reported.

## Next Steps
- Link your GitHub repo to Vercel now!
- Update the environment variables as shown above.
