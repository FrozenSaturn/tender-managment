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

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
