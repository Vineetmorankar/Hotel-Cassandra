// import { v4 as uuidv4 } from "uuid"; // For generating UUIDs
// import { cassandraClient } from "../index.js"; // Cassandra client

// // Create a new tour
// export const createTour = async (req, res) => {
//   const tourData = {
//     tourId: uuidv4(),
//     title: req.body.title, // Title of the tour
//     city: req.body.city, // City where the tour is located
//     address: req.body.address, // Address of the tour
//     distance: req.body.distance, // Distance value
//     photo: req.body.photo || "", // Photo URL or path
//     description: req.body.desc, // Description of the tour
//     price: req.body.price, // Price of the tour
//     maxGroupSize: req.body.maxGroupSize, // Maximum group size
//     reviews: [], // Initially no reviews (empty list)
//     featured: req.body.featured || true, // Whether the tour is featured
//     createdAt: new Date().toISOString(), // Current timestamp for created_at
//     updatedAt: new Date().toISOString(), // Current timestamp for updated_at
//   };

//   try {
//     const query = `
//       INSERT INTO tours (tour_id, title, city, address, distance, photo, description, price, max_group_size, reviews, featured, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const params = [
//       tourData.tourId, // UUID for tour_id
//       tourData.title, // Title of the tour
//       tourData.city, // City where the tour is located
//       tourData.address, // Address of the tour
//       tourData.distance, // Distance value
//       tourData.photo, // Photo URL
//       tourData.description, // Description of the tour
//       tourData.price, // Price of the tour
//       tourData.maxGroupSize, // Maximum group size
//       tourData.reviews, // List of reviews (empty for now)
//       tourData.featured, // Whether the tour is featured
//       tourData.createdAt, // Created timestamp
//       tourData.updatedAt, // Updated timestamp
//     ];

//     // Execute the query with prepared statement
//     await cassandraClient.execute(query, params, { prepare: true });

//     res
//       .status(200)
//       .json({ success: true, message: "Successfully created", data: tourData });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to create. Try again!" });
//   }
// };

// export const updateTour = async (req, res) => {
//   const tourId = req.params.id;

//   try {
//     const query = `
//       UPDATE tours
//       SET name = ?, city = ?, featured = ?, max_group_size = ?, price = ?, updated_at = ?
//       WHERE tour_id = ?
//     `;
//     const params = [
//       req.body.name,
//       req.body.city,
//       req.body.featured,
//       req.body.maxGroupSize,
//       req.body.price,
//       new Date().toISOString(),
//       tourId,
//     ];

//     await cassandraClient.execute(query, params, { prepare: true });

//     res.status(200).json({ success: true, message: "Successfully updated" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to update" });
//   }
// };

// export const deleteTour = async (req, res) => {
//   const tourId = req.params.id;

//   try {
//     const query = `DELETE FROM tours WHERE tour_id = ?`;
//     await cassandraClient.execute(query, [tourId], { prepare: true });

//     res.status(200).json({ success: true, message: "Successfully deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to delete" });
//   }
// };

// export const getSingleTour = async (req, res) => {
//   const tourId = req.params.id;

//   try {
//     const query = `SELECT * FROM tours WHERE tour_id = ? `;
//     const result = await cassandraClient.execute(query, [tourId], {
//       prepare: true,
//     });

//     if (result.rowLength === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Tour not found" });
//     }

//     const tour = result.rows[0];
//     res
//       .status(200)
//       .json({ success: true, message: "Successfully retrieved", data: tour });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to retrieve tour" });
//   }
// };

// export const getAllTour = async (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = 8;

//   try {
//     const query = `SELECT * FROM tours LIMIT ?`;
//     const result = await cassandraClient.execute(query, [limit * (page + 1)], {
//       prepare: true,
//     });

//     res.status(200).json({
//       success: true,
//       count: result.rowLength,
//       message: "Successfully retrieved",
//       data: result.rows.slice(page * limit, (page + 1) * limit),
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to retrieve tours" });
//   }
// };

// export const getTourBySearch = async (req, res) => {
//   const city = req.query.city || "";
//   const maxGroupSize = parseInt(req.query.maxGroupSize);

//   try {
//     const query = `SELECT * FROM tours WHERE city = ? AND max_group_size >= ?`;
//     const result = await cassandraClient.execute(query, [city, maxGroupSize], {
//       prepare: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Successfully retrieved",
//       data: result.rows,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to search tours" });
//   }
// };

// // export const getFeaturedTour = async (req, res) => {
// //   try {
// //     const query = `SELECT * FROM tours WHERE featured = true  `;
// //     const result = await cassandraClient.execute(query, [], { prepare: true });

// //     res.status(200).json({
// //       success: true,
// //       message: "Successfully retrieved",
// //       data: result.rows,
// //     });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to retrieve featured tours" });
// //   }
// // };

// export const getFeaturedTour = async (req, res) => {
//   try {
//     const query = `SELECT * FROM tours WHERE featured = true ALLOW FILTERING`;
//     const result = await cassandraClient.execute(query, [], { prepare: true });

//     if (result.rowLength === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No featured tours found",
//       });
//     }

//     // Limit the results to 8 in the application logic
//     const limitedResults = result.rows.slice(0, 8); // or result.rows.slice(0, req.query.limit || 8)

//     res.status(200).json({
//       success: true,
//       message: "Successfully retrieved featured tours",
//       data: limitedResults,
//     });
//   } catch (error) {
//     console.error("Error retrieving featured tours:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve featured tours",
//       error: error.message,
//     });
//   }
// };

// export const getTourCount = async (req, res) => {
//   try {
//     const query = `SELECT COUNT(*) FROM tours`;
//     const result = await cassandraClient.execute(query);

//     const tourCount = result.rows[0].count;
//     res.status(200).json({ success: true, data: tourCount });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch tour count" });
//   }
// };

import { v4 as uuidv4 } from "uuid"; // Make sure to import uuidv4
import { cassandraClient } from "../index.js"; // Cassandra client

// Create a new tour
export const createTour = async (req, res) => {
  const tourData = {
    tourId: uuidv4(),
    title: req.body.title, // Title of the tour
    city: req.body.city, // City where the tour is located
    address: req.body.address, // Address of the tour
    distance: req.body.distance, // Distance value
    photo: req.body.photo || "", // Photo URL or path
    description: req.body.desc, // Description of the tour
    price: req.body.price, // Price of the tour
    maxGroupSize: req.body.maxGroupSize, // Maximum group size
    featured: req.body.featured || true, // Whether the tour is featured
    createdAt: new Date().toISOString(), // Current timestamp for created_at
    updatedAt: new Date().toISOString(), // Current timestamp for updated_at
  };

  try {
    const query = `
      INSERT INTO tours (tour_id, title, city, address, distance, photo, description, price, max_group_size, featured, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      tourData.tourId, // UUID for tour_id
      tourData.title, // Title of the tour
      tourData.city, // City where the tour is located
      tourData.address, // Address of the tour
      tourData.distance, // Distance value
      tourData.photo, // Photo URL
      tourData.description, // Description of the tour
      tourData.price, // Price of the tour
      tourData.maxGroupSize, // Maximum group size
      tourData.featured, // Whether the tour is featured
      tourData.createdAt, // Created timestamp
      tourData.updatedAt, // Updated timestamp
    ];

    // Execute the query with prepared statement
    await cassandraClient.execute(query, params, { prepare: true });

    res
      .status(200)
      .json({ success: true, message: "Successfully created", data: tourData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again!" });
  }
};

// Update an existing tour
export const updateTour = async (req, res) => {
  const tourId = req.params.id;

  try {
    const query = `
      UPDATE tours 
      SET title = ?, city = ?, featured = ?, max_group_size = ?, price = ?, updated_at = ?
      WHERE tour_id = ?
    `;
    const params = [
      req.body.title,
      req.body.city,
      req.body.featured,
      req.body.maxGroupSize,
      req.body.price,
      new Date().toISOString(),
      tourId,
    ];

    await cassandraClient.execute(query, params, { prepare: true });

    res.status(200).json({ success: true, message: "Successfully updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  const tourId = req.params.id;

  try {
    const query = `DELETE FROM tours WHERE tour_id = ?`;
    await cassandraClient.execute(query, [tourId], { prepare: true });

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
  const tourId = req.params.id;

  try {
    const query = `SELECT * FROM tours WHERE tour_id = ?`;
    const result = await cassandraClient.execute(query, [tourId], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    const tour = result.rows[0];
    res
      .status(200)
      .json({ success: true, message: "Successfully retrieved", data: tour });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve tour" });
  }
};

// Get all tours with pagination
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 8;

  try {
    const query = `SELECT * FROM tours LIMIT ?`;
    const result = await cassandraClient.execute(query, [limit * (page + 1)], {
      prepare: true,
    });

    res.status(200).json({
      success: true,
      count: result.rowLength,
      message: "Successfully retrieved",
      data: result.rows.slice(page * limit, (page + 1) * limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve tours" });
  }
};

// Search for tours based on city and max group size
export const getTourBySearch = async (req, res) => {
  const city = req.query.city || "";
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const query = `SELECT * FROM tours WHERE city = ? AND max_group_size >= ?`;
    const result = await cassandraClient.execute(query, [city, maxGroupSize], {
      prepare: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to search tours" });
  }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const query = `SELECT * FROM tours WHERE featured = true ALLOW FILTERING`;
    const result = await cassandraClient.execute(query, [], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(404).json({
        success: false,
        message: "No featured tours found",
      });
    }

    // Limit the results to 8 in the application logic
    const limitedResults = result.rows.slice(0, 8);

    res.status(200).json({
      success: true,
      message: "Successfully retrieved featured tours",
      data: limitedResults,
    });
  } catch (error) {
    console.error("Error retrieving featured tours:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve featured tours",
      error: error.message,
    });
  }
};

// Get total count of tours
export const getTourCount = async (req, res) => {
  try {
    const query = `SELECT COUNT(*) FROM tours`;
    const result = await cassandraClient.execute(query);

    const tourCount = result.rows[0].count;
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tour count" });
  }
};
