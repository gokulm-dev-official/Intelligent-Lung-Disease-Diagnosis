# LungAI - Lung Disease Detection System

A complete MERN stack web application for detecting lung diseases (COVID-19, Pneumonia, Tuberculosis) from Chest X-ray images using Deep Learning.

## Features

*   **AI Diagnostics:** Instant analysis of Chest X-rays using TensorFlow.js (Node.js backend).
*   **Patient Management:** Comprehensive record keeping, search, and filtering.
*   **Dashboard:** Visual analytics of disease distribution and clinic stats.
*   **Reports:** (Planned) Generate PDF reports for patients.
*   **Secure & Private:** Data stored locally in MongoDB.

## Tech Stack

*   **Frontend:** React 18, Tailwind CSS, Recharts, Framer Motion
*   **Backend:** Node.js, Express, MongoDB
*   **AI Engine:** TensorFlow.js (Node)

## Installation

1.  **Clone the repository** (if applicable).

2.  **Install Dependencies:**

    **Backend:**
    ```bash
    cd backend
    npm install
    ```

    **Frontend:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Environment Setup:**
    The backend connects to MongoDB. Ensure you have MongoDB running locally or update the connection string in `backend/config/db.js` (or `.env`).

4.  **AI Model:**
    Follow the instructions in `MOdel_Conversion_Instructions.md` to place your TFJS model in `backend/model/`.

## Running the Application

1.  **Start Backend:**
    ```bash
    cd backend
    npm start
    ```
    Server runs on `http://localhost:5000`.

2.  **Start Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    Client runs on `http://localhost:5173`.

3.  **Usage:**
    *   Open the frontend URL.
    *   Register patients in the "Patients" tab.
    *   Go to "Analysis" to upload an X-ray image.
    *   View results and dashboard stats.

## License
MIT
