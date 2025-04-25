import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("MongoDB URI not provided in the .env file.");
    return;
  }

  await mongoose
    .connect(mongoURI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB connection error:", err));
};

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://priteshxtech:Priteshnath200@cluster0.dqna9.mongodb.net/food-delevery')
//     .then(() => console.log("DB Connected"));
// }
