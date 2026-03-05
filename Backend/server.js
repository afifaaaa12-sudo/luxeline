import app, { initServices } from "./app.js";

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await initServices();

    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
