const express = require('express');
const router = express.Router();
const Form = require('../schemas/form')
const VerificarLogin = require('../middleware/VerificarLogin');

// Rota para atualizar o cliente
router.get('/:id', VerificarLogin, async (req, res) => {
    const id = req.params.id;
    const nomeSessao = req.session.user.info.nome;
    console.log(nomeSessao)

    try {
        const form = await Form.findByIdAndUpdate(id, {
            $set: {
                atendimento: {
                    status: 1,
                    responsavel: nomeSessao
                }
            }
        }, { new: true });

        if (!form) {
            return res.status(404).send('Orcamento não encontrado.');
        }

        res.redirect('/orcamento');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar o orcamento');
    }
});

module.exports = router;
