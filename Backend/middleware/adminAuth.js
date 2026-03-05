import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const headerToken = req.headers.token;
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : undefined;
    const token = headerToken || bearerToken;

    if (!token) {
      return res.json({ success: false, message: "not authorized admin login try again" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "not authorized admin login try again" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
