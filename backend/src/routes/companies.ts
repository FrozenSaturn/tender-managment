// backend/src/routes/companies.ts
import express, { Response, NextFunction } from "express";
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth";
import knex from "../db/knex";
import { z } from "zod";
// We would also set up multer and Supabase client here for file uploads

const router = express.Router();

// Validation schema for profile updates
const companyUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  industry: z.string().optional(),
  description: z.string().optional(),
});

//## Get Current Company's Profile: GET /api/companies/me
router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const companyId = req.user!.companyId;
    const company = await knex("companies").where({ id: companyId }).first();

    if (!company) {
      res.status(404).json({ message: "Company not found." });
      return;
    }
    res.json(company);
  }
);

//## Update Company Profile: PUT /api/companies/me
router.put(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

// Note: Logo upload endpoint (POST /me/logo) would be added here.
// It would use multer to process the form-data and the Supabase client
// to upload the file and get back a URL, which is then saved
// to the companies table.

export default router;
