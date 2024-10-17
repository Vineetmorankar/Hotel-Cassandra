import express from "express";
import { userBookings } from "../Controllers/bookingController.js";
// import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id", userBookings);

export default router;
