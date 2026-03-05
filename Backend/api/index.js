import app, { initServices } from "../app.js";

export default async function handler(req, res) {
  try {
    await initServices();
    return app(req, res);
  } catch (error) {
    console.error("Serverless init error:", error.message);
    return res.status(500).json({ success: false, message: "Server initialization failed" });
  }
}
