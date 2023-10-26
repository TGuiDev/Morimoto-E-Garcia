const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente'); // Importe seu modelo
const VerificarLogin = require('../middleware/VerificarLogin');

// Rota para a página de edição
router.get('/:id', VerificarLogin, async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.render('Editar/', { cliente });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar o cliente para edição');
    }
});

module.exports = router;
