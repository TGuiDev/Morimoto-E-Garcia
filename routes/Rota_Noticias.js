const express = require('express');
const router = express.Router();
const Noticia = require("../schemas/noticia");

router.get('/', async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.render('Noticias/', { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao recuperar noticias cadastrados');
  }
});

module.exports = router;
