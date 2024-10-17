// import { v4 as uuidv4 } from "uuid"; // To generate UUIDs for the primary key
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { cassandraClient } from "../index.js";

// // User register
// export const register = async (req, res) => {
//   try {
//     // Hash password
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const id = uuidv4(); // Create a unique ID for the new user
//     const { username, email, role, photo } = req.body;
//     const createdAt = new Date().toISOString();

//     // Insert new user into Cassandra
//     const query = `
//       INSERT INTO users (id, username, email, password, photo, role, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const params = [
//       id,
//       username,
//       email,
//       hash,
//       photo,
//       role || "user",
//       createdAt,
//       createdAt,
//     ];

//     await cassandraClient.execute(query, params, { prepare: true });

//     res.status(200).json({ success: true, message: "Successfully created!" });
//   } catch (error) {
//     console.error("Failed to create user:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to create! Try again." });
//   }
// };

// // User login
// export const login = async (req, res) => {
//   try {
//     const email = req.body.email;

//     // Query the user from Cassandra by email
//     const query = "SELECT * FROM users WHERE email = ? ALLOW FILTERING";
//     const result = await cassandraClient.execute(query, [email], {
//       prepare: true,
//     });

//     if (result.rowLength === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found!" });
//     }

//     const user = result.first(); // Get the first row returned
//     console.log("User found:", user);

//     const checkCorrectPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!checkCorrectPassword) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Incorrect email or password!" });
//     }

//     const { password, ...rest } = user;

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "15d" }
//     );

//     // Set the token in cookies and send the response
//     res
//       .cookie("accessToken", token, { httpOnly: true, expiresIn: "15d" })
//       .status(200)
//       .json({ token, data: rest, role: user.role });
//   } catch (error) {
//     console.error("Login failed:", error);
//     res.status(500).json({ success: false, message: "Failed to login" });
//   }
// };

import { v4 as uuidv4 } from "uuid"; // To generate UUIDs for the primary key
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cassandraClient } from "../index.js";

// User register
export const register = async (req, res) => {
  try {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const id = uuidv4(); // Create a unique ID for the new user
    const { username, email, role } = req.body; // Removed photo
    const createdAt = new Date().toISOString();

    // Insert new user into Cassandra
    const query = `
      INSERT INTO users (id, username, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      id,
      username,
      email,
      hash,
      role || "user",
      createdAt,
      createdAt,
    ];

    await cassandraClient.execute(query, params, { prepare: true });

    res.status(200).json({ success: true, message: "Successfully created!" });
  } catch (error) {
    console.error("Failed to create user:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create! Try again." });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const email = req.body.email;

    // Query the user from Cassandra by email
    const query = "SELECT * FROM users WHERE email = ? ALLOW FILTERING";
    const result = await cassandraClient.execute(query, [email], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const user = result.first(); // Get the first row returned
    console.log("User found:", user);

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password!" });
    }

    const { password, ...rest } = user;

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set the token in cookies and send the response
    res
      .cookie("accessToken", token, { httpOnly: true, expiresIn: "15d" })
      .status(200)
      .json({ token, data: rest, role: user.role });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
