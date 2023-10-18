const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente');

router.get('/', async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.render('Clientes/', { clientes });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao recuperar clientes cadastrados');
    }
});


router.get('/:id', async (req, res) => {
    const clienteId = req.params.id;

    try {
        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            res.status(404).send('Cliente não encontrado');
        } else {
            res.render('Cliente/', { cliente }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar cliente');
    }
});

module.exports = router;
