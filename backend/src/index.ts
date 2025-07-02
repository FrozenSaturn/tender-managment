// backend/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import your routes
import authRoutes from "./routes/auth";
import companyRoutes from "./routes/companies";
import tenderRoutes from "./routes/tenders";
import searchRoutes from "./routes/search";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Update CORS configuration with your actual Vercel domain
const allowedOrigins = [
  "http://localhost:3000",
  "https://tender-managment.vercel.app",
  "https://tender-managment-cvpaic7cm-aryaa111000-gmailcoms-projects.vercel.app", // Your Vercel domain
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Add a health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// Add a health check endpoint for /api
app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
