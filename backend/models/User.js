// models/User.js
import { cassandraClient } from "../config/db.js";

class User {
  constructor(userId, username, email, password, role, photo) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.photo = photo;
  }

  static async create(user) {
    const query = `INSERT INTO users (userId, username, email, password, role, photo) VALUES (?, ?, ?, ?, ?, ?)`;
    await cassandraClient.execute(
      query,
      [
        user.userId,
        user.username,
        user.email,
        user.password,
        user.role,
        user.photo,
      ],
      { prepare: true }
    );
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await cassandraClient.execute(query, [email], {
      prepare: true,
    });
    return result.rows[0];
  }

  // Add other methods as needed
}

export default User;
