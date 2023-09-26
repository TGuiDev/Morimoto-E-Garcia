const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('Novidades/');
  } catch (error) {
    res.render('Novidades/');
  }
});

module.exports = router;
