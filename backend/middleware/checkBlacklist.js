import BlacklistToken from "../models/blacklistModel.js";

// TODO use errorResponse util for consistent error messages

const checkTokenBlacklist = async (req, res, next) => {
  const token = req.cookies.jwt;

  const blacklistedToken = await BlacklistToken.findOne({ token });
  if (blacklistedToken) {
    console.warn("Token blacklisted:", token);
    return res.status(401).json({ message: "Token blacklisted" });
  }

  // no blacklist match
  console.log("Token not blacklisted. Proceeding with the request.");

  next();

  // ! chatGPT suggestion
  // try {
  //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //   const tokenIdentifier = decodedToken._id; // Modify this according to your token structure

  //   const blacklistedToken = await BlacklistToken.findOne({ tokenIdentifier });
  //   if (blacklistedToken) {
  //     return res.status(401).json({ message: "Token blacklisted" });
  //   }

  //   next();
  // } catch (error) {
  //   console.log("check 5");
  //   return res.status(401).json({ message: "Token blacklisted" });
  // }
};

export default checkTokenBlacklist;
