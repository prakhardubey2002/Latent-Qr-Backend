const express = require('express')
const bcrypt = require('bcryptjs')
const Profile = require('../models/Profile')
const router = express.Router()

// Register a new profile
router.post('/register', async (req, res) => {
  const { name, companyName, email, password, link, reviewCode } = req.body

  try {
    // Check if profile with the same email exists
    let profile = await Profile.findOne({ email })
    if (profile) {
      return res
        .status(400)
        .json({ message: 'Profile with this email already exists' })
    }

    profile = new Profile({
      name,
      companyName,
      email,
      password,
      link,
      reviewCode,
    })

    await profile.save()
    res.status(201).json({ message: 'Profile registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})
router.get('/link/:reviewCode', async (req, res) => {
  const { reviewCode } = req.params

  try {
    // Find profile by reviewCode
    const profile = await Profile.findOne({ reviewCode })

    // If profile is not found, return error
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    // Return the link
    res.status(200).json({ link: profile.link })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching link', error })
  }
})
router.post('/signin', async (req, res) => {
  const { code, password } = req.body

  try {
    // Find the user by review code
    const profile = await Profile.findOne({ reviewCode: code })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' })
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, profile.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    // Optionally, generate a token or session here
    // For example, using JSON Web Token (JWT)
    // const token = jwt.sign({ id: profile._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response
    res.status(200).json({ message: 'Login successful', profile }) // You can include the token if you're using JWT
  } catch (error) {
    console.error('Error during sign-in:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
})
module.exports = router
