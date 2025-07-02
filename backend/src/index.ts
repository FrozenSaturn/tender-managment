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

// Update CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://tender-managment-cvpaic7cm-aryaa111000-gmailcoms-projects.vercel.app", // Your Vercel domain
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
