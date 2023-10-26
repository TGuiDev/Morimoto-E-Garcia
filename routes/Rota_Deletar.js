const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente');
const VerificarLogin = require('../middleware/VerificarLogin');

// Rota para exclusão de cliente
router.get('/:id', VerificarLogin, async (req, res) => {
    const clienteId = req.params.id;
    try{
        await Cliente.deleteOne({ _id: clienteId }) 
        res.redirect('/clientes?success=Cliente Deletado Com Sucesso!');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erro ao excluir o cliente')
    }
});

module.exports = router;