const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('Home/');
  } catch (error) {
    res.render('Home/');
  }
});

module.exports = router;
