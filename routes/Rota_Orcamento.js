const express = require('express');
const router = express.Router();
const Form = require('../schemas/form');
const VerificarLogin = require('../middleware/VerificarLogin');

router.get('/', VerificarLogin, async (req, res) => {

  Form.find({}, 'nome email telefone categoria mensagem data')
    .then((users) => {
      const userData = users.map((user) => {
        return {
          Nome: user.nome,
          Email: user.email,
          Telefone: user.telefone,
          Categoria: user.categoria,
          Mensagem: user.mensagem, // Correção: era "Menagem"
          Data: user.data
        };
      });
      
      res.render('Orcamentos/', { userData });
    })
    .catch((error) => {
      res.status(500).send('Erro ao recuperar os dados dos usuários: ' + error.message);
    });
});

module.exports = router;
