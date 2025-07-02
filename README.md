# B2B Tender Management Platform

A full-stack B2B platform where companies can register, manage their profile, publish tenders, and apply for opportunities.

---

## Live Demo

-   **Frontend:** `[Add your Vercel deployment link here]`
-   **Backend:** `[Add your Heroku/Render deployment link here]`

---

## Key Features

-   **Authentication:** Secure user sign-up and login using JWT-based authorization.
-   **Company Profiles:** Full CRUD functionality for company profiles, including logo uploads to Supabase Storage.
-   **Tender Management:** Companies can create, publish, and manage their own tenders.
-   **Application Workflow:** A complete system for companies to browse and apply to active tenders.
-   **Company Search:** A server-side search API to find other companies by name or industry.

---

## Tech Stack

-   **Frontend:** Next.js, TypeScript, Mantine UI, Tailwind CSS
-   **Backend:** Express.js, TypeScript
-   **Database:** PostgreSQL
-   **Storage:** Supabase Storage
-   **ORM/Query Builder:** Knex.js

---

## Local Setup and Installation

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   PostgreSQL

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `backend/` directory and populate it with your credentials:
    ```env
    DATABASE_URL=postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/your_db_name
    JWT_SECRET=your_super_secret_jwt_key
    SUPABASE_URL=[https://your-project-ref.supabase.co](https://your-project-ref.supabase.co)
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run database migrations:**
    ```bash
    npx knex migrate:latest
    ```
5.  **Start the server:**
    ```bash
    npm run dev
    ```
    The backend will run on `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the `frontend/` directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001/api
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.
