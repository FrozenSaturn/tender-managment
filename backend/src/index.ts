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

// --- MIDDLEWARES ---

// 1. Universal CORS Handler (runs for every request, including OPTIONS)
app.use(cors());

// 2. Body Parser
app.use(express.json());

// --- HEALTH CHECKS & API ROUTES ---
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});
app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/search", searchRoutes);

// --- SERVER LISTENER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
