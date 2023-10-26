const express = require('express');
const router = express.Router();
const Form = require('../schemas/form');
const VerificarLogin = require('../middleware/VerificarLogin');

router.get('/', VerificarLogin, async (req, res) => {

  Form.find({}, '_id nome email telefone categoria mensagem data atendimento.status atendimento.responsavel')
    .then((users) => {
      const userData = users.map((user) => {
        return {
          ID: user._id,
          Nome: user.nome,
          Email: user.email,
          Telefone: user.telefone,
          Categoria: user.categoria,
          Mensagem: user.mensagem,
          Data: user.data,
          Atendimento: {
            Status: user.atendimento.status,
            Responsavel: user.atendimento.responsavel
          }
        };
      });

      
      res.render('Orcamentos/', { userData });
    })
    .catch((error) => {
      res.status(500).send('Erro ao recuperar os dados dos usuários: ' + error.message);
    });
});




module.exports = router;
