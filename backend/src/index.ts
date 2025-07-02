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

/* ---------- CORS: allow localhost + ANY *.vercel.app ---------- */
app.use(
  cors({
    origin: (origin, cb) => {
      // curl / Postman / server-to-server
      if (!origin) return cb(null, true);

      // local dev
      if (origin.startsWith("http://localhost:3000")) return cb(null, true);

      // every Vercel preview & production domain
      if (/\.vercel\.app$/.test(new URL(origin).hostname))
        return cb(null, true);

      // everything else → blocked
      cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // you're using Bearer tokens, not cookies
  })
);
/* -------------------------------------------------------------- */

// OPTIONAL: respond to pre-flight quickly
app.options("*", cors());

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
