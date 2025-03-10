import express from "express";
import {
  registration,
  events,
} from "../controllers/registration.controller.js";

const router = express.Router();
router.route("/registration").post(registration);
router.route("/events").get(events);
export default router;
