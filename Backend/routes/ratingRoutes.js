import express from "express";
import {
  addOrUpdateRating,
  getAverageRating,
} from "../controllers/ratingController.js";

const router = express.Router();

// POST route to submit or update a rating
router.post("/add", addOrUpdateRating);

// GET route to get average rating of a food item
router.get("/average/:foodId", getAverageRating);

export default router;
