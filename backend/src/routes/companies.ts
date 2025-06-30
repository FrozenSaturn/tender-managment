// backend/src/routes/companies.ts
import express, { Response } from "express";
import { z } from "zod";
import knex from "../db/knex";
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

// --- Initialization ---
const router = express.Router();

// Initialize Supabase client (make it optional)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Set up multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Validation Schemas ---
const companyUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  industry: z.string().optional(),
  description: z.string().optional(),
});

// --- Routes ---

/**
 * ## Get Current Company's Profile
 * @route GET /api/companies/me
 * @protected
 * Fetches the profile of the currently authenticated user's company.
 */
router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const companyId = req.user!.companyId;
    const company = await knex("companies").where({ id: companyId }).first();

    if (!company) {
      res.status(404).json({ message: "Company not found." });
      return;
    }
    res.json(company);
  }
);

/**
 * ## Update Company Profile Details
 * @route PUT /api/companies/me
 * @protected
 * Updates the metadata (name, industry, description) of the company.
 */
router.put(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const companyId = req.user!.companyId;
      const dataToUpdate = companyUpdateSchema.parse(req.body);

      if (Object.keys(dataToUpdate).length === 0) {
        res.status(400).json({ message: "No update data provided." });
        return;
      }

      const [updatedCompany] = await knex("companies")
        .where({ id: companyId })
        .update(dataToUpdate)
        .returning("*");

      res.json(updatedCompany);
    } catch (error) {
      res.status(400).json({ message: "Invalid input.", details: error });
    }
  }
);

/**
 * ## Upload Company Logo
 * @route POST /api/companies/me/logo
 * @protected
 * Handles logo image uploads to Supabase Storage.
 */
router.post(
  "/me/logo",
  authMiddleware,
  upload.single("logo"),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!supabase) {
      res.status(503).json({ message: "File upload service not available." });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    const companyId = req.user!.companyId;
    const file = req.file;
    const fileExt = file.mimetype.split("/")[1] || "png";
    const fileName = `public/${companyId}-${Date.now()}.${fileExt}`;

    try {
      const bucketName = "company-images";

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      const logoUrl = urlData.publicUrl;

      await knex("companies")
        .where({ id: companyId })
        .update({ logo_url: logoUrl });

      res.json({ message: "Logo uploaded successfully.", logo_url: logoUrl });
    } catch (error: any) {
      console.error("Logo Upload Error:", error);
      res
        .status(500)
        .json({ message: "Failed to upload logo.", details: error.message });
    }
  }
);

export default router;
