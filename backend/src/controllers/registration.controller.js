import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

import ApiResponse from "../utils/ApiResponse.js";
import { Registration } from "../models/registration.model.js";
import { nanoid } from "nanoid";

// =================== Register ===================
const registration = asyncErrorHandler(async (req, res) => {
  const { name, email, contact } = req.body;

  if (!name || !email || !contact) {
    throw new ApiError(401, "error", "Something is missing, please check");
  }

  const checkEmail = await Registration.findOne({ email });
  // ------------------ check duplicate username and email ------------------
  if (checkEmail) {
    throw new ApiError(400, "error", "email already exists");
  } else {
    const registrationId = nanoid(10);
    console.log(registrationId);
    const newRegistration = new Registration({
      name,
      email,
      contact,
      registrationId,
    });
    await newRegistration.save();

    res
      .status(200)
      .json(new ApiResponse(200, registrationId, "Registration successful"));
  }
});

const events = asyncErrorHandler(async (req, res) => {
  res.json([
    { id: 1, name: "Tech Conference", date: "2025-04-01" },
    { id: 2, name: "Web Dev Bootcamp", date: "2025-04-10" },
  ]);
});

export { registration, events };
