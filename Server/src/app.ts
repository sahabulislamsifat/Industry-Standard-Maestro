import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./app/config/passport";

const app = express();

// ❌ Remove express-session (no connect.sid anymore)
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

// ✅ Allow frontend domains
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tour-management-system-2025.netlify.app",
    ],
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Tour Management System API",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
