import express from 'express';
import { createTour, deleteTour, getAllTour, getDetailTour, getFeaturedTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verityToken.js';
const router = express.Router();

// Create new tour
router.post('/', verifyAdmin, createTour)

// Update tour
router.put('/:id', verifyAdmin, updateTour)

// Delete tour
router.delete('/:id', verifyAdmin, deleteTour)

// Get all tours
router.get('/', getAllTour)

// Get tour by ID
router.get('/:id', getDetailTour)

// Get tour by search
router.get('/search/getTourBySearch', getTourBySearch)

// Get featured tour
router.get('/search/getFeaturedTours', getFeaturedTour)

// Get tour count
router.get('/search/getTourCount', getTourCount)

export default router;