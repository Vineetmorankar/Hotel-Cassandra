import { v4 as uuidv4 } from "uuid"; // For generating unique UUIDs
import nodemailer from "nodemailer";
import { cassandraClient } from "../index.js"; // Ensure you're importing the Cassandra client

// Create a new booking
export const createBooking = async (req, res) => {
  const bookingData = {
    bookingId: uuidv4(), // Generate a unique booking ID
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    tourName: req.body.tourName,
    fullName: req.body.fullName,
    guestSize: req.body.guestSize,
    phone: req.body.phone,
    bookAt: req.body.bookAt,
    bookUpto: req.body.bookUpto,
    city: req.body.city,
    address: req.body.address,
    photo: req.body.photo,
    price: req.body.price,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    // Create booking in Cassandra
    const query = `
      INSERT INTO bookings (booking_id, user_id, user_email, tour_name, full_name, guest_size, phone, book_at, book_upto, city, address, photo, price, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      bookingData.bookingId,
      bookingData.userId,
      bookingData.userEmail,
      bookingData.tourName,
      bookingData.fullName,
      bookingData.guestSize,
      bookingData.phone,
      bookingData.bookAt,
      bookingData.bookUpto,
      bookingData.city,
      bookingData.address,
      bookingData.photo,
      bookingData.price,
      bookingData.createdAt,
      bookingData.updatedAt,
    ];

    await cassandraClient.execute(query, params, { prepare: true });

    // Sending email using nodemailer (same logic as your original code)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vineetmorankar393@gmail.com",
        pass: "dops yeeg muap fizn",
      },
    });

    const htmlContent = `
      <h1>Tour Booking Confirmation</h1>
      <p><strong>Tour Name:</strong> ${req.body.tourName}</p>
      <p><strong>Full Name:</strong> ${req.body.fullName}</p>
      <p><strong>Phone:</strong> ${req.body.phone}</p>
      <p><strong>Guest Size:</strong> ${req.body.guestSize}</p>
      <p><strong>Booking Dates:</strong> ${req.body.bookAt} to ${req.body.bookUpto}</p>
      <p><strong>City:</strong> ${req.body.city}</p>
      <p><strong>Address:</strong> ${req.body.address}</p>
    `;

    const mailOptions = {
      from: "vineetmorankar393@gmail.com",
      to: bookingData.userEmail,
      subject: "Tour Booking Confirmation",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Email could not be sent!" });
      } else {
        return res.status(200).json({
          success: true,
          message: "Your tour is booked! Confirmation email sent.",
          data: bookingData,
        });
      }
    });
  } catch (error) {
    console.error("Error creating booking", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Get single booking by booking_id
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const query = `SELECT * FROM bookings WHERE booking_id = ?`;
    const result = await cassandraClient.execute(query, [id], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found!" });
    }

    const booking = result.rows[0];
    return res
      .status(200)
      .json({ success: true, message: "Successful!", data: booking });
  } catch (error) {
    console.error("Error fetching booking", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const query = `SELECT * FROM bookings`;
    const result = await cassandraClient.execute(query);

    return res
      .status(200)
      .json({ success: true, message: "Successful!", data: result.rows });
  } catch (error) {
    console.error("Error fetching bookings", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Get bookings for a specific user
export const userBookings = async (req, res) => {
  const id = req.params.id;

  try {
    const query = `SELECT * FROM bookings WHERE user_id = ? ALLOW FILTERING`;
    const result = await cassandraClient.execute(query, [id], {
      prepare: true,
    });
    console.log("Success", result.rows);
    return res
      .status(200)
      .json({ success: true, message: "Successful!", data: result.rows });
  } catch (error) {
    console.error("Error fetching user bookings", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};
