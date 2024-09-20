// models/Review.js
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reviewCode: {
    type: String,
    required: true,
  },
  rating: {
    type: Number, // New field to store rating
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
