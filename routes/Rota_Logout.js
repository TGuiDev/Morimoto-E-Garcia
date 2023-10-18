const express = require('express');
const session = require('express-session');
const router = express.Router();
const Admin = require('../schemas/admin');

router.get('/', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Erro ao fazer logout:', error);
        }
        res.redirect('/login');
    });
});
  
module.exports = router;
