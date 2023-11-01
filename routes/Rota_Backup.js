const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Cliente = require('../schemas/cliente');
const Admin = require('../schemas/admin');
const Form = require('../schemas/form');
const Noticia = require('../schemas/noticia');
const VerificarLogin = require('../middleware/VerificarLogin');

router.get('/', VerificarLogin, async (req, res) => {
  try {
    // Crie um objeto para armazenar os dados que você deseja fazer backup
    const dataToBackup = {
      clientes: await Cliente.find({}).exec(),
      admins: await Admin.find({}).exec(),
      forms: await Form.find({}).exec(),
      noticias: await Noticia.find({}).exec(),
    };

    // Converta os dados para JSON
    const jsonData = JSON.stringify(dataToBackup);

    // Obtenha a data e hora atual
    const now = new Date();
    
    // Crie o nome do diretório de backup formatado com dia-mês-ano
    const dateFormatted = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    // Crie o nome do diretório de backup formatado com hora-minuto-segundo
    const timeFormatted = `${now.getHours()}h ${now.getMinutes()}m ${now.getSeconds()}s`;

    // Determine o caminho para o diretório de backup
    const backupDirectory = path.join(__dirname, '../backup', dateFormatted);

    // Garanta que o diretório exista
    fs.mkdirSync(backupDirectory, { recursive: true });

    // Determine o nome do arquivo de backup
    const backupFileName = `backup ${timeFormatted}.json`;

    // Determine o caminho para o arquivo de backup
    const backupFilePath = path.join(backupDirectory, backupFileName);

    // Crie o arquivo de backup
    fs.writeFileSync(backupFilePath, jsonData);

    // console.log('Backup criado com sucesso em:', backupFilePath);
    // res.status(200).send('Backup criado com sucesso em: ' + backupFilePath);
    res.redirect('/painel-admin?success=Backup criado com sucesso!')
  } catch (error) {
    console.error('Erro ao criar o backup:', error);
    res.status(500).send('Erro ao criar o backup');
  }
});

module.exports = router;
