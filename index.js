console.clear();
require("colors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const Admin = require('./schemas/admin');

// Configurações do Express
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(
  session({
    secret: "user",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexão com o MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🍃 | Manguinho |".white + " Conectado".green);
  })
  .catch((error) => {
    console.log("🍃 | Manguinho |".white + " Erro de conexão com MongoDB".red);
    console.log(error.yellow);
  });

// Rotas
const Erro = require("./routes/Rota_Erro");
const Login = require("./routes/Rota_Login");
const Editar = require("./routes/Rota_Editar");
const Logout = require("./routes/Rota_Logout");
const Inicio = require("./routes/Rota_Inicio");
const Noticia = require("./routes/Rota_Noticia");
const Deletar = require("./routes/Rota_Deletar");
const Noticias = require("./routes/Rota_Noticias");
const Contatar = require("./routes/Rota_Contatar");
const Atualizar = require("./routes/Rota_Atualizar");
const Orcamento = require("./routes/Rota_Orcamento");
const AreaAdmin = require("./routes/Rota_AreaAdmin");
const CadNoticia = require("./routes/Rota_CadNoticia");
const CadClientes = require("./routes/Rota_CadCliente");
const VerClientes = require("./routes/Rota_VerClientes");
const CadOrcamento = require("./routes/Rota_CadOrcamento");
const CadNovoUsuario = require("./routes/Rota_CadastroNovoUsuario");

app.use("/", Inicio);
app.use("/erro", Erro);
app.use("/login", Login);
app.use("/editar", Editar);
app.use("/logout", Logout);
app.use("/noticia", Noticia);
app.use("/deletar", Deletar);
app.use("/noticias", Noticias);
app.use("/contatar", Contatar);
app.use("/atualizar", Atualizar);
app.use("/orcamento", Orcamento);
app.use("/clientes", VerClientes);
app.use("/cadnoticia", CadNoticia);
app.use("/painel-admin", AreaAdmin);
app.use("/cadorcamento", CadOrcamento);
app.use("/cadnovocliente", CadClientes);
app.use("/cadnovousuario", CadNovoUsuario);

const Backup = require("./routes/Rota_Backup");
app.use("/backup", Backup);


app.use((req, res) => {
  res.redirect("/erro");
});

const porta = process.env.PORT || 1010;
app.listen(porta, async () => {
  console.log(
    `👍 | Site Iniciado  |`.white + ` http://localhost:${porta}`.rainbow
  );
});


































// const Cliente = require('./schemas/cliente');
// const Admin = require('./schemas/admin');

// mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     // Crie um novo cliente
//     const novoCliente = new Cliente({
//       info: {
//         nome: 'Nome do Cliente',
//         cpf: '12345678900',
//         dataNascimento: new Date('1990-01-01'),
//         endereco: {
//           rua: 'Endereço do Cliente',
//           cidade: 'Cidade',
//           estado: 'Estado',
//           cep: '12345-678',
//         },
//         contatos: {
//           email: 'email@cliente.com',
//           telefone: '123456789',
//         },
//       },
//       notas: [
//         {
//           texto: 'Esta é uma nota de exemplo.'
//         }
//       ]
//     });

//     const novoAdmin = new Admin({
//       Id: generateRandomId(),
//       info: {
//         nome: 'Admin',
//       },
//       credencial: {
//         email: 'admin@root.adv',
//         senha: 'morimotoegarcia',
//         acesso: 'A'
//       }
//     })
// novoCliente.save()
//   .then((clienteSalvo) => {
//     console.log('Novo cliente salvo com sucesso:', clienteSalvo);
//   })
//   .catch((erro) => {
//     console.error('Erro ao salvar o cliente:', erro);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

//   novoAdmin.save()
//     .then((clienteSalvo) => {
//       console.log('Acesso admin criado!', clienteSalvo);
//     })
//     .catch((erro) => {
//       console.error('Erro ao salvar o cliente:', erro);
//     })
//     .finally(() => {
//       mongoose.connection.close();
//     });
// })
// .catch((erro) => {
//   console.error('Erro ao conectar ao banco de dados:', erro);
// });

// const { v4: uuidv4 } = require("uuid");

// function generateRandomId() {
//     const uniqueId = uuidv4();
//     return uniqueId;
// }
