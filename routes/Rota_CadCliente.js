const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Cliente = require('../schemas/cliente');

router.post('/', async (req, res) => {
    try {
        // Gerar um ID único para o cliente
        const clientId = uuidv4();

        // Extrair os dados do formulário do corpo da solicitação
        const {
            nome,
            dataNascimento,
            cpf,
            rg,
            cnpj,
            inscricaoEstadual,
            cidade,
            cep,
            bairro,
            endereco,
            numero,
            uf,
            complemento,
            telCelular1,
            telCelular2,
            telResidencial,
            telComercial,
            nomepai,
            nomemae,
            nomeempresa,
            cargoempresa,
            trabalhadesde,
            site,
            email,
            observacoes,
        } = req.body;

        // Criar um objeto cliente com os dados do formulário
        const cliente = new Cliente({
            id: clientId,
            info: {
                nome,
                dataNascimento,
                cpf,
                rg,
                cnpj,
                inscricaoEstadual,
                endereco: {
                    cidade,
                    cep,
                    bairro,
                    endereco,
                    numero,
                    uf,
                    complemento,
                },
                contato: {
                    telCelular1,
                    telCelular2,
                    telResidencial,
                    telComercial,
                },
                outros: {
                    complementos: {
                        nomepai,
                        nomemae,
                        nomeempresa,
                        cargoempresa,
                        trabalhadesde,
                    },
                    site,
                    email,
                },
                observacoes,
            },
        });

        // Salvar o cliente no banco de dados
        await cliente.save();

        res.redirect('/painel-admin?success=Cliente%20cadastrado%20com%20sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar o cliente' });
    }
});


module.exports = router;
