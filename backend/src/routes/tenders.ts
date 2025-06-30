// backend/src/routes/tenders.ts
import express, { NextFunction, Response } from "express";
import { z } from "zod";
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth";
import knex from "../db/knex";

const router = express.Router();

// Validation schema for creating/updating a tender
const tenderSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  deadline: z.string().datetime(), // Expecting ISO 8601 date string
  budget: z.number().positive().optional(),
});

//## Create a new Tender: POST /api/tenders
router.post("/", authMiddleware, async (req: AuthenticatedRequest, res) => {
  try {
    const data = tenderSchema.parse(req.body);
    const companyId = req.user!.companyId;

    const [newTender] = await knex("tenders")
      .insert({
        ...data,
        company_id: companyId,
      })
      .returning("*");

    res.status(201).json(newTender);
  } catch (error) {
    res.status(400).json({ message: "Invalid data provided", details: error });
  }
});

//## List all Tenders (Paginated): GET /api/tenders
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10;

  const tenders = await knex("tenders")
    .join("companies", "tenders.company_id", "companies.id")
    .select("tenders.*", "companies.name as companyName")
    .orderBy("deadline", "desc")
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  const total = await knex("tenders").count("id as count").first();

  res.json({
    data: tenders,
    pagination: {
      page,
      pageSize,
      total: total ? total.count : 0,
    },
  });
});

//## Get company-specific Tenders: GET /api/tenders/my-tenders
router.get(
  "/my-tenders",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const companyId = req.user!.companyId;
    const tenders = await knex("tenders").where({ company_id: companyId });
    res.json(tenders);
  }
);

//## Update a Tender: PUT /api/tenders/:id
router.put(
  "/:id",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const tenderId = parseInt(req.params.id);
      const companyId = req.user!.companyId;
      const dataToUpdate = tenderSchema.partial().parse(req.body);

      const tender = await knex("tenders").where({ id: tenderId }).first();
      if (!tender) {
        res.status(404).json({ message: "Tender not found" });
        return;
      }

      // Authorization check: ensure the user's company owns this tender
      if (tender.company_id !== companyId) {
        res
          .status(403)
          .json({ message: "Forbidden: You do not own this tender" });
        return;
      }

      const [updatedTender] = await knex("tenders")
        .where({ id: tenderId })
        .update(dataToUpdate)
        .returning("*");

      res.json(updatedTender);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Invalid data provided", details: error });
    }
  }
);

router.post(
  "/:tenderId/apply",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const tenderId = parseInt(req.params.tenderId);
      const applyingCompanyId = req.user!.companyId;
      const { proposal } = z
        .object({ proposal: z.string().min(1) })
        .parse(req.body);

      const tender = await knex("tenders").where({ id: tenderId }).first();
      if (!tender) {
        res.status(404).json({ message: "Tender not found." });
        return;
      }

      // Prevent a company from applying to its own tender
      if (tender.company_id === applyingCompanyId) {
        res
          .status(403)
          .json({ message: "You cannot apply to your own tender." });
        return;
      }

      const [newApplication] = await knex("applications")
        .insert({
          tender_id: tenderId,
          company_id: applyingCompanyId,
          proposal,
        })
        .returning("*");

      res
        .status(201)
        .json({
          message: "Application submitted successfully.",
          application: newApplication,
        });
    } catch (error: any) {
      // Handle unique constraint violation (applying twice)
      if (error.code === "23505") {
        res
          .status(409)
          .json({ message: "You have already applied to this tender." });
        return;
      }
      res
        .status(400)
        .json({ message: "Invalid request", details: error.message });
    }
  }
);

//## Retrieve all applications for a Tender: GET /api/tenders/:tenderId/applications
router.get(
  "/:tenderId/applications",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const tenderId = parseInt(req.params.tenderId);
    const companyId = req.user!.companyId;

    const tender = await knex("tenders").where({ id: tenderId }).first();
    if (!tender) {
      res.status(404).json({ message: "Tender not found." });
      return;
    }

    // Authorization check: ensure user owns the tender to see its applications
    if (tender.company_id !== companyId) {
      res
        .status(403)
        .json({
          message: "Forbidden: You cannot view applications for this tender.",
        });
      return;
    }

    const applications = await knex("applications")
      .where({ tender_id: tenderId })
      .join("companies", "applications.company_id", "companies.id")
      .select(
        "applications.id",
        "applications.proposal",
        "companies.id as companyId",
        "companies.name as companyName",
        "companies.logo_url as companyLogo"
      );

    res.json(applications);
  }
);

export default router;
