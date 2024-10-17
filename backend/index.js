import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Client } from "cassandra-driver"; // Cassandra driver
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
// import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import userBooking from "./routes/userBooking.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// Create Cassandra client
const cassandraClient = new Client({
  cloud: {
    secureConnectBundle: process.env.CASSANDRA_SECURE_BUNDLE_PATH, // secure connect bundle for AstraDB
  },
  credentials: {
    username: process.env.CASSANDRA_CLIENT_ID,
    password: process.env.CASSANDRA_CLIENT_SECRET,
  },
  keyspace: process.env.CASSANDRA_KEYSPACE, // your keyspace here
});

// Connect to Cassandra
const connect = async () => {
  try {
    await cassandraClient.connect();
    console.log("Cassandra connected");
  } catch (error) {
    console.error("Cassandra connection failed", error);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/tours", tourRoute);
app.use("/users", userRoute);
// app.use("/review", reviewRoute);
app.use("/booking", bookingRoute);
app.use("/userbooking", userBooking);

// Start server
app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});

export { cassandraClient }; // Export Cassandra client for use in controllers/models
