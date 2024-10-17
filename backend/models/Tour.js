// models/Tour.js
import { cassandraClient } from "../config/db.js";

class Tour {
  constructor(
    title,
    city,
    address,
    distance,
    photo,
    desc,
    price,
    maxGroupSize
  ) {
    this.title = title;
    this.city = city;
    this.address = address;
    this.distance = distance;
    this.photo = photo;
    this.desc = desc;
    this.price = price;
    this.maxGroupSize = maxGroupSize;
  }

  static async create(tour) {
    const query = `INSERT INTO tours (title, city, address, distance, photo, desc, price, maxGroupSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await cassandraClient.execute(
      query,
      [
        tour.title,
        tour.city,
        tour.address,
        tour.distance,
        tour.photo,
        tour.desc,
        tour.price,
        tour.maxGroupSize,
      ],
      { prepare: true }
    );
  }

  static async findById(id) {
    const query = `SELECT * FROM tours WHERE title = ?`;
    const result = await cassandraClient.execute(query, [id], {
      prepare: true,
    });
    return result.rows[0];
  }

  // Add other methods as needed
}

export default Tour;
