const express = require('express');
const session = require('express-session');
const router = express.Router();
const Admin = require('../schemas/admin');


router.use(
  session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
  })
);

router.get('/', async (req, res) => {
  const successMessage = req.query.success;
  try {
    res.render('Login/', { successMessage });
  } catch (error) {
    res.render('Login/', { successMessage: 'Erro ao fazer Login.' });
  }
});

router.post('/', (req, res) => {
  const email = req.body.username;
  const senha = req.body.password;
  const successMessage = req.query.success;

  Admin.findOne({ 'credencial.email': email })
    .then((user) => {
      if (!user) {
        // console.log('Usuário não encontrado:', email);
        return res.render('Login/', { successMessage: `Não foi possivel fazer login: Email incorreto.` });
      }
      else if (user.credencial.senha !== senha) {
        // console.log('Senha incorreta para o usuário:', email);
        return res.render('Login/', { successMessage: `Não foi possivel fazer login: Senha incorreta.` });
      }

      // console.log('Login bem-sucedido para o usuário:', email + ' e ' + senha);
      req.session.user = user;
      res.redirect('/painel-admin');
    })
    .catch((error) => {
      console.error('Erro ao fazer login:', error);
      res.status(500).render('Login/',  successMessage );
    });

    // console.log(User)
});

module.exports = router;
