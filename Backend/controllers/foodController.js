import foodModel from "../models/foodModel.js";
import fs from "fs";
import ratingModel from "../models/ratingModel.js";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, data: "Error" });
//   }
// };
// All food list with average rating
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    const foodsWithRatings = await Promise.all(
      foods.map(async (food) => {
        // Fetch ratings for the current food item
        const ratings = await ratingModel.find({ foodId: food._id });

        let avgRating = 0;
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
          avgRating = (sum / ratings.length).toFixed(1);
        }

        return {
          ...food._doc, // Add other properties from the food document
          averageRating: avgRating, // Add average rating to the food item
        };
      })
    );

    res.json({ success: true, data: foodsWithRatings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
