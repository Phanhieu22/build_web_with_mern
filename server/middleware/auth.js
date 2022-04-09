const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // bearer alkjdsvboáidbva
  // có thể viết cảnh báo nếu trong data base có posts này rồi

  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "access token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "invalid access token",
    });
  }
};
module.exports = verifyToken;
