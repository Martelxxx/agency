import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    userType: { type: String, required: true },
    region: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

export default User;