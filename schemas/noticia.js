const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
    id: {
        unique: true,
        type: String,
    },
    capa: {
        type: String,
    },
    titulo: {
        type: String,
    },
    descricao: {
        type: String,
    },
    data: {
        type: String,
    },
    autor: {
        type: String,
    },
    modelo: {
        type: String,
    },
});

const Noticia= mongoose.model('Noticias', noticiaSchema);
module.exports = Noticia;