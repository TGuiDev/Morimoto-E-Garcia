const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente');

// Rota para adicionar um novo cliente
router.post('/', async (req, res) => {
    try {
        const { nome, cpf, dataNascimento, endereco, contatos } = req.body;
        const novoCliente = new Cliente({ nome, cpf, dataNascimento, endereco, contatos });
        await novoCliente.save();
        res.status(201).json(novoCliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rota para adicionar uma nova nota a um cliente existente
router.post('/:clienteId/notas', async (req, res) => {
    try {
        const clienteId = req.params.clienteId;
        const { texto } = req.body;
        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        cliente.notas.push({ texto });
        await cliente.save();
        res.status(201).json(cliente.notas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
