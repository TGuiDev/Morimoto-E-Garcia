const  format  = require("date-fns/format");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const Form = require("../schemas/form");
const fs = require("fs");
const VerificarLogin = require('../middleware/VerificarLogin');

// Middleware para analisar JSON
router.use(express.json());

router.post("/", VerificarLogin, async (req, res) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm:ss");
//   console.log(formattedDate);

  try {
    const newpost = new Form({
      id: generateRandomId(),
      nome: req.body.nome,
      telefone: req.body.phone,
      categoria: req.body.categoria,
      mensagem: req.body.mensagem,
      data: formattedDate,
      atendimento: {
        responsavel: null
      }
    });

    // console.log(newpost);
    await newpost.save();

    setTimeout(() => {
      res.redirect("/#orcamento");
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
