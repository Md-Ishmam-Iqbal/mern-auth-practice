import mongoose from "mongoose";

const BlacklistSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const BlacklistToken = mongoose.model("BlacklistToken", BlacklistSchema);

export default BlacklistToken;
