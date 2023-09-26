const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Id: {
        unique: true,
        type: String,
    },
    info: {
        nome: {
            type: String,
        },
        avatar: {
            type: String,
            default: 'https://imgur.com/7ZBYzXG.png',
        }
    },
    credencial: {
        email: {
            type: String,
            unique: true,
        },
        senha: {
            type: String,
        },
        acesso: {
            type: String,
        }
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;