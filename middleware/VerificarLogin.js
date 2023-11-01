// middleware/VerificarLogin.js

async function VerificarLogin(req, res, next) {
  try {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login?success=Opa! Primeiro faça login.');
    }
  } catch (err) {
    console.log(err);
    throw new Error("Ocorreu um erro ao verificar a sessão do usuário.");
  }
}

module.exports = VerificarLogin;
