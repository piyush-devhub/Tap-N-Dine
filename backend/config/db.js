import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://piyushkere:passofproj@cluster0.lg5gz.mongodb.net/tapndine').then(()=>console.log("DB Connected"));
}