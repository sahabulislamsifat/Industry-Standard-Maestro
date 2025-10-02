/* eslint-disable no-console */
import { createServer } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVariables } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { connectRedis } from "./app/config/redis.config";

const server = createServer(app);

const startServer = async () => {
  console.log("NODE_ENV:", envVariables.NODE_ENV);

  try {
    await mongoose.connect(envVariables.DB_URL);
    console.log("✅ Connected to MongoDB");

    server.listen(envVariables.PORT, () => {
      console.log(`✅ Server running on port ${envVariables.PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

(async () => {
  await connectRedis();
  await startServer();
  await seedSuperAdmin();
})();

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.error("💥 unhandledRejection detected. Shutting down...", err);
  server.close(() => process.exit(1));
});

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.error("💥 uncaughtException detected. Shutting down...", err);
  server.close(() => process.exit(1));
});

// Signals
process.on("SIGTERM", () => {
  console.log("⚡ SIGTERM received. Shutting down gracefully...");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("⚡ SIGINT received. Shutting down gracefully...");
  server.close(() => process.exit(0));
});
