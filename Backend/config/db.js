import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://priteshxtech:Priteshnath200@cluster0.dqna9.mongodb.net/food-delevery"
    )
    .then(() => console.log("DB Connected"));
};
