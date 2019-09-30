const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const authHeader = req.header("authorization");
  if (!authHeader)
    return res.status(404).send("Access Denied. No Token Provided");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).send("No Token Provided");
  try {
    const payload = await jwt.verify(token, process.env.jwtPrivateKey);
    // adding user property to req object
    req.user = payload;
    next();
  } catch (er) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
