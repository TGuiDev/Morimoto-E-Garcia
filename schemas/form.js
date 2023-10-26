const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    id: {
        type: 'String',
    },
    nome: {
        type: String,
    },
    email: { 
        type: String,
    },
    telefone: {
        type: String,
    },
    categoria: {
        type: String,
    },
    mensagem: {
        type: String,
    },
    data: {
        type: String,
    },
    atendimento: {
        status: {
            type: Boolean,
            default: 0,
        },
        responsavel: {
            type: String,
        },
    }
});


const Form = mongoose.model('Forms', formSchema);
module.exports = Form;