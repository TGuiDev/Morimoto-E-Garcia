// console.clear();
require('colors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const app = express();

// Configurações do Express
app.set('view engine', 'ejs');
app.use(express.static('public'));app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(
  session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
  })
);
app.use((req, res, next) => {
  // Verificar se o usuário está autenticado
  res.locals.currentUser = req.session.user || null;
  next();
});



// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexão com o MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('🍃 | Manguinho |'.white + ' Conectado'.green);
}).catch((error) => {
  console.log('🍃 | Manguinho |'.white + ' Erro de conexão com MongoDB'.red);
  console.log(error.yellow);
});


// Rotas
const Inicio = require('./routes/Rota_Inicio');
const Novidades = require('./routes/Rota_Novidades');
const AreaAdmin = require('./routes/Rota_AreaAdmin');
const Clientes = require('./routes/Rota_Clientes');

app.use('/', Inicio);
app.use('/novidades', Novidades);
app.use('/admin', AreaAdmin);
app.use('/clientes', Clientes);

app.use((req, res) => {
  res.redirect('/erro');
});

const porta = process.env.PORT || 1010;
app.listen(porta, () => {
  console.log(`👍 | Site Iniciado  |`.white + ` http://localhost:${porta}`.rainbow);
});




// const mongoosee = require('mongoose');
// const Cliente = require('./schemas/cliente'); // Substitua 'seuModeloDeCliente' pelo caminho correto para o seu modelo

// mongoosee.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         // Crie um novo cliente
//         const novoCliente = new Cliente({
//             info: {
//                 nome: 'Nome do Cliente',
//                 cpf: '12345678900', // Substitua pelo CPF desejado
//                 dataNascimento: new Date('1990-01-01'), // Substitua pela data de nascimento desejada
//                 endereco: {
//                     rua: 'Endereço do Cliente',
//                     cidade: 'Cidade',
//                     estado: 'Estado',
//                     cep: '12345-678', // Substitua pelo CEP desejado
//                 },
//                 contatos: {
//                     email: 'email@cliente.com',
//                     telefone: '123456789', // Substitua pelo telefone desejado
//                 },
//             },
//             notas: [
//                 {
//                     texto: 'Esta é uma nota de exemplo.'
//                 }
//             ]
//         });

//         // Salve o novo cliente no banco de dados
//         novoCliente.save()
//             .then((clienteSalvo) => {
//                 console.log('Novo cliente salvo com sucesso:', clienteSalvo);
//             })
//             .catch((erro) => {
//                 console.error('Erro ao salvar o cliente:', erro);
//             })
//             .finally(() => {
//                 // Feche a conexão com o banco de dados após a inserção
//                 mongoosee.connection.close();
//             });
//     })
//     .catch((erro) => {
//         console.error('Erro ao conectar ao banco de dados:', erro);
//     });
