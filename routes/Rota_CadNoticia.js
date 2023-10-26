const  format  = require("date-fns/format");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Noticia = require("../schemas/noticia");
const Admin = require('../schemas/admin');
const fs = require("fs");
const VerificarLogin = require('../middleware/VerificarLogin');

// Middleware para analisar JSON
router.use(express.json());

router.post("/", VerificarLogin, async (req, res) => {
  let usuarioLogadoNome;
  let usuarioLogadoFoto;
  const usuarioLogadoId = req.session.user; 
  const usuarioLogado = await Admin.findById(usuarioLogadoId);
  try {
    if (usuarioLogado) {
      usuarioLogadoNome = usuarioLogado.info.nome;
      usuarioLogadoFoto = usuarioLogado.info.avatar
    } else {
      usuarioLogadoNome = '';
      usuarioLogadoFoto = '';
      console.log('Usuário não encontrado');
    }
  } catch (error) {
    console.log(error);
  }

  console.log(usuarioLogadoNome)

  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm:ss");
//   console.log(formattedDate);

  try {
    const newNoticia = new Noticia({
      id: generateRandomId(),
      titulo: req.body.titulonoticia,
      descricao: req.body.descposagem,
      autor: usuarioLogadoNome,
      data: formattedDate,
    });

    // console.log(newNoticia);
    await newNoticia.save();

    setTimeout(() => {
      res.redirect('/painel-admin?success=Noticia%20postada%20com%20sucesso');
    }, 2000);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

function generateRandomId() {
  const uniqueId = uuidv4();
  return uniqueId;
}

module.exports = router;
