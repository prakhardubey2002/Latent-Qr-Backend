const express = require('express');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');
const router = express.Router();

// Register a new profile
router.post('/register', async (req, res) => {
    const { name, companyName, email, password, link, reviewCode } = req.body;

    try {
        // Check if profile with the same email exists
        let profile = await Profile.findOne({ email });
        if (profile) {
            return res.status(400).json({ message: 'Profile with this email already exists' });
        }

        profile = new Profile({
            name,
            companyName,
            email,
            password,
            link,
            reviewCode
        });

        await profile.save();
        res.status(201).json({ message: 'Profile registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.get('/link/:reviewCode', async (req, res) => {
    const { reviewCode } = req.params;
  
    try {
      // Find profile by reviewCode
      const profile = await Profile.findOne({ reviewCode });
  
      // If profile is not found, return error
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Return the link
      res.status(200).json({ link: profile.link });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching link', error });
    }
  });

module.exports = router;
