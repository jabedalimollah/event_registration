import express from "express";

import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

// ----------- Middlewares ----------
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// --------- Import Routes -------------
import registrationRoute from "./routes/registration.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/event", registrationRoute);

// ----------- It is used for incorrect endpoint and wrong api requests ----------
app.use("*", (req, res, next) => {
  // =============== x ==================
  const err = new ApiError(404, "fail", `Can't find ${req.originalUrl} on th`);
  next(err);
});

// ----------------- Error handler ---------
app.use(errorHandler);

export { app };
