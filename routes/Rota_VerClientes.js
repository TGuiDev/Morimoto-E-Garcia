const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente');
const VerificarLogin = require('../middleware/VerificarLogin');

router.get('/', VerificarLogin, async (req, res) => {
    const successMessage = req.query.success;
    try {
      const clientes = await Cliente.find();
      res.render('Clientes/', { clientes, successMessage  });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao recuperar clientes cadastrados');
    }
});


router.get('/:id', VerificarLogin, async (req, res) => {
    const clienteId = req.params.id;
    const successMessage = req.query.success;

    try {
        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            res.status(404).send('Cliente não encontrado');
        } else {
            res.render('Cliente/', { cliente, successMessage }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar cliente');
    }
});

module.exports = router;
