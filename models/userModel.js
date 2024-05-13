import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name must be provided"],
    },

    email: {
      type: String,
      required: [true],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 15,
    },
    cartData: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { minimize: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
