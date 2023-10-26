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
  try {
    res.render('Login/', { message: '' });
  } catch (error) {
    res.render('Login/', { message: '' });
  }
});

router.post('/', (req, res) => {
  const email = req.body.username;
  const senha = req.body.password;

  Admin.findOne({ 'credencial.email': email })
    .then((user) => {
      if (!user) {
        // console.log('Usuário não encontrado:', email);
        return res.render('Login/', { message: `Não foi possivel fazer login: Email incorreto.` });
      }
      else if (user.credencial.senha !== senha) {
        // console.log('Senha incorreta para o usuário:', email);
        return res.render('Login/', { message: `Não foi possivel fazer login: Senha incorreta.` });
      }

      // console.log('Login bem-sucedido para o usuário:', email + ' e ' + senha);
      req.session.user = user;
      res.redirect('/painel-admin');
    })
    .catch((error) => {
      console.error('Erro ao fazer login:', error);
      res.status(500).render('Login/', { message: `Erro ao fazer login.` });
    });

    // console.log(User)
});

module.exports = router;
