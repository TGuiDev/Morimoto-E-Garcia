const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    info: {
        nome: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            unique: true,
            required: true,
        },
        dataNascimento: {
            type: Date,
            required: true,
        },
        endereco: {
            rua: String,
            cidade: String,
            estado: String,
            cep: String,
        },
        contatos: {
            email: String,
            telefone: String,
        },
    },
    notas: [
        {
            data: {
                type: Date,
                default: Date.now
            },
            texto: String,
        }
    ]
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;

console.log(Cliente);