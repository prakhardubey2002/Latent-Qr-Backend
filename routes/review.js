// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST request to send a review
router.post('/send-review', async (req, res) => {
  const { name, email, message, reviewCode, rating } = req.body;

  if (!name || !email || !message || !reviewCode || !rating) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    const newReview = new Review({
      name,
      email,
      message,
      reviewCode,
      rating
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error });
  }
});
router.get('/:reviewCode', async (req, res) => {
  const { reviewCode } = req.params;
  
  try {
    const reviews = await Review.find({ reviewCode });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
