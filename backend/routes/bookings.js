import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
} from "../Controllers/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
// router.get("/:id", verifyUser, userBooking);
router.get("/", verifyAdmin, getAllBookings);

export default router;
