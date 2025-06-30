// backend/src/routes/auth.ts
import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import knex from "../db/knex";

const router = express.Router();

// Input validation schema for sign-up
const signUpSchema = z.object({
  companyName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

interface SignUpBody {
  companyName: string;
  email: string;
  password: string;
}

//## Sign-up Endpoint: POST /api/auth/signup
router.post(
  "/signup",
  async (
    req: Request<{}, {}, SignUpBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { companyName, email, password } = signUpSchema.parse(req.body);

      const existingUser = await knex("users").where({ email }).first();
      if (existingUser) {
        res.status(409).json({ message: "Email already in use." });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 12);

      // Use a transaction to ensure both company and user are created
      await knex.transaction(async (trx) => {
        const [company] = await trx("companies")
          .insert({ name: companyName })
          .returning("id");
        await trx("users").insert({
          email,
          password_hash: passwordHash,
          company_id: company.id,
        });
      });

      res
        .status(201)
        .json({ message: "Company and user registered successfully." });
    } catch (error) {
      res.status(400).json({ message: "Invalid input.", details: error });
    }
  }
);

interface SignInBody {
  email: string;
  password: string;
}

//## Sign-in Endpoint: POST /api/auth/signin
router.post(
  "/signin",
  async (
    req: Request<{}, {}, SignInBody>,
    res: Response,
    next: NextFunction
  ) => {
    // Logic: Find user, compare password, issue JWT
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();
    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id },
      process.env.JWT_SECRET!, // Ensure you have JWT_SECRET in your .env file
      { expiresIn: "1d" }
    );

    res.json({ token });
  }
);

export default router;
