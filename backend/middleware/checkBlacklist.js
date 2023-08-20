import BlacklistToken from "../models/blacklistModel.js";

const checkTokenBlacklist = async (req, res, next) => {
  const token = req.cookies.jwt;

  const blacklistedToken = await BlacklistToken.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

export default checkTokenBlacklist;
