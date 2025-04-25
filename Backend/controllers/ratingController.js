import ratingModel from "../models/ratingModel.js";

// Add or update a rating
export const addOrUpdateRating = async (req, res) => {
  try {
    const { foodId, userId, rating } = req.body;

    if (!foodId || !userId || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // Check if a rating from the same user for the same food already exists
    const existingRating = await ratingModel.findOne({ foodId, userId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ success: true, message: "Rating updated" });
    } else {
      // Create new rating
      const newRating = new ratingModel({ foodId, userId, rating });
      await newRating.save();
      return res.json({ success: true, message: "Rating added" });
    }
  } catch (error) {
    console.error("Error in addOrUpdateRating:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get average rating for a food item
export const getAverageRating = async (req, res) => {
  try {
    const { foodId } = req.params;

    const ratings = await ratingModel.find({ foodId });

    if (ratings.length === 0) {
      return res.json({ success: true, averageRating: 0, totalRatings: 0 });
    }

    const total = ratings.reduce((acc, item) => acc + item.rating, 0);
    const average = total / ratings.length;

    res.json({
      success: true,
      averageRating: average.toFixed(1),
      totalRatings: ratings.length,
    });
  } catch (error) {
    console.error("Error in getAverageRating:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
