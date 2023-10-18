const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('Home/', { currentUser: res.locals.currentUser, message: '' });
  } catch (error) {
    res.render('Home/', { currentUser: res.locals.currentUser, message: '' });
  }
});

module.exports = router;
