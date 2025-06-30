// backend/src/routes/search.ts
import express, { Request, Response } from "express";
import knex from "../db/knex";

const router = express.Router();

/**
 * ## Search for companies: GET /api/search/companies?q=<query>
 *
 * This endpoint searches for companies by their name, industry, or
 * the name of the goods and services they offer.
 *
 * It performs a case-insensitive search and returns a list of
 * unique companies that match the search query.
 */
router.get("/companies", async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ message: 'Search query "q" is required.' });
    return;
  }

  try {
    const searchTerm = `%${query}%`;

    const companies = await knex("companies")
      // We select all columns from the companies table
      .select("companies.*")
      // We use DISTINCT to ensure each company appears only once
      .distinct()
      // We join the goods_and_services table to search within their names
      .leftJoin(
        "goods_and_services",
        "companies.id",
        "goods_and_services.company_id"
      )
      // The WHERE clause checks for a match in any of the three fields
      .where("companies.name", "ilike", searchTerm)
      .orWhere("companies.industry", "ilike", searchTerm)
      .orWhere("goods_and_services.name", "ilike", searchTerm);

    res.json(companies);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "An error occurred during the search." });
  }
});

export default router;
