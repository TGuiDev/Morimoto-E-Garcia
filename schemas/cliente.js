const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    info: {
        nome: {
            type: String,
        },
        dataNascimento: {
            type: Date,
        },
        cpf: {
            type: String,
        },
        rg: {
            type: String,
        },
        cnpj: {
            type: String,
        },
        inscricaoEstadual: {
            type: String,
        },
        endereco: {
            cidade: {
                type: String,
            },
            cep: {
                type: String,
            },
            bairro: {
                type: String,
            },
            endereco: {
                type: String,
            },
            numero: {
                type: String,
            },
            uf: {
                type: String,
            },
            complemento: {
                type: String,
            },
        },
        contato: {
            telCelular1: {
                type: String,
            },
            telCelular2: {
                type: String,
            },
            telResidencial: {
                type: String,
            },
            telComercial: {
                type: String,
            },
        },
        outros: {
            complementos: {
                nomepai: {
                    type: String,
                },
                nomemae: {
                    type: String,
                },
                nomeempresa: {
                    type: String,
                },
                cargoempresa: {
                    type: String,
                },
                trabalhadesde: {
                    type: Date,
                },
            },
            site: {
                type: String,
            },
            email: {
                type: String,
            },
        },
        observacoes: {
            type: String,
        },
    },
    servicos: [
        {
            data: {
                type: Date,
                default: Date.now,
            },
            texto: String,
        },
    ],
});

const Cliente = mongoose.model('Clientes', clienteSchema);

module.exports = Cliente;
