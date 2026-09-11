# Smart CV Frontend

> 🚀 **Live Demo →** [https://smart-cv-frontend-seven.vercel.app/](https://smart-cv-frontend-seven.vercel.app/)

An AI-powered resume reviewer and ATS analyzer built with React + Vite, backed by a FastAPI service.

## Features

- 📄 Upload a PDF resume and paste a job description
- 🤖 AI analysis via Google Gemini
- 📊 ATS score, matched & missing skills, suggestions, and interview prep questions
- ⚡ Auto-wakes the Render backend on page load (no cold-start delay for the user)

## Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Frontend | React 18 + Vite      |
| Styling  | Vanilla CSS          |
| HTTP     | Axios                |
| Deploy   | Vercel               |
| Backend  | FastAPI (on Render)  |

## Run locally

1. Install dependencies:

```bash
cd smart_cv_frontend
npm install
```

2. Create a `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

3. Start the dev server:

```bash
npm run dev
```

> The backend must also be running locally. See the [backend README](../smart_cv_backend/README.md).
