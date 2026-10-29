const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', async (req, res) => {
  if (!checkBody(req.body, ['name', 'email', 'password'])) {
    return res.json({
      result: false,
      error: 'Missing or empty fields',
    });
  }

  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.json({
        result: false,
        error: 'User already exists',
      });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    return res.json({ result: true });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error: 'Server error',
    });
  }
});


router.post('/signin', async (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    return res.json({
      result: false,
      error: 'Missing or empty fields',
    });
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.json({
        result: false,
        error: 'User not found',
      });
    }

    return res.json({ result: true });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error: 'Server error',
    });
  }
});


module.exports = router;
