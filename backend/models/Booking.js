// models/Booking.js
import { cassandraClient } from "../config/db.js";

class Booking {
  constructor(
    bookingId,
    userId,
    tourName,
    fullName,
    phone,
    guestSize,
    bookAt,
    bookUpto
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.tourName = tourName;
    this.fullName = fullName;
    this.phone = phone;
    this.guestSize = guestSize;
    this.bookAt = bookAt;
    this.bookUpto = bookUpto;
  }

  static async create(booking) {
    const query = `INSERT INTO bookings (bookingId, userId, tourName, fullName, phone, guestSize, bookAt, bookUpto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await cassandraClient.execute(
      query,
      [
        booking.bookingId,
        booking.userId,
        booking.tourName,
        booking.fullName,
        booking.phone,
        booking.guestSize,
        booking.bookAt,
        booking.bookUpto,
      ],
      { prepare: true }
    );
  }

  static async findById(id) {
    const query = `SELECT * FROM bookings WHERE bookingId = ?`;
    const result = await cassandraClient.execute(query, [id], {
      prepare: true,
    });
    return result.rows[0];
  }

  static async findAll() {
    const query = `SELECT * FROM bookings`;
    const result = await cassandraClient.execute(query, [], { prepare: true });
    return result.rows;
  }

  // Add other methods as needed
}

export default Booking;
