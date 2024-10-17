import { v4 as uuidv4 } from "uuid"; // For generating UUIDs
import { cassandraClient } from "../index.js"; // Cassandra client

// Create a new user
export const createUser = async (req, res) => {
  const userData = {
    userId: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // Normally hashed before saving
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const query = `
      INSERT INTO users (user_id, name, email, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.userId,
      userData.name,
      userData.email,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
    ];

    await cassandraClient.execute(query, params, { prepare: true });

    res
      .status(200)
      .json({ success: true, message: "Successfully created", data: userData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again!" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `
      UPDATE users 
      SET name = ?, email = ?, password = ?, updated_at = ?
      WHERE user_id = ?
    `;
    const params = [
      req.body.name,
      req.body.email,
      req.body.password,
      new Date().toISOString(),
      userId,
    ];

    await cassandraClient.execute(query, params, { prepare: true });

    res.status(200).json({ success: true, message: "Successfully updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `DELETE FROM users WHERE user_id = ?`;
    await cassandraClient.execute(query, [userId], { prepare: true });

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `SELECT * FROM users WHERE user_id = ?`;
    const result = await cassandraClient.execute(query, [userId], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];
    res
      .status(200)
      .json({ success: true, message: "Successfully retrieved", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const result = await cassandraClient.execute(query, [], { prepare: true });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve users" });
  }
};
