import Tour from "../models/Tour.js";

// Create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const saveTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: saveTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Please try again",
    });
  }
};

// Update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updateTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Please try again",
    });
  }
};

// Delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Please try again",
    });
  }
};

// Get detail tour
export const getDetailTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get detail tour",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tours
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 8; // Number of tours per page

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Successfully get all tours",
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to get all tours. Please try again",
    });
  }
};

// Get tour by search
export const getTourBySearch = async (req, res) => {
  const city = req.query.city ? new RegExp(req.query.city, "i") : "";
  const distance = req.query.distance ? parseInt(req.query.distance) : 0;
  const maxGroupSize = req.query.maxGroupSize ? parseInt(req.query.maxGroupSize) : 0;

  try {
    const tours = await Tour.find({
      city: { $regex: city },
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    });

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully fetched featured tours",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to get featured tours. Please try again",
    });
  }
};

// Get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get tour count. Please try again",
    });
  }
};
