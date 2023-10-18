const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente');
const VerificarLogin = require('../middleware/VerificarLogin');

router.get('/', VerificarLogin, async (req, res) => {
    try {
        const successMessage = req.query.success;

        res.render('Painel/', { successMessage });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
