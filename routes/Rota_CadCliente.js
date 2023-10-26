const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Cliente = require('../schemas/cliente');
const VerificarLogin = require('../middleware/VerificarLogin');

router.post('/', VerificarLogin, async (req, res) => {
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


        console.log(uf)

        // Criar um objeto cliente com os dados do formulário
        const cliente = new Cliente({
            id: clientId,
            info: {
                nome: nome || 'Não Informado',
                dataNascimento: dataNascimento || 'Não Informado',
                cpf: cpf || 'Não Informado',
                rg: rg || 'Não Informado',
                cnpj: cnpj || 'Não Informado',
                inscricaoEstadual: inscricaoEstadual || 'Não Informado',
                endereco: {
                    cidade: cidade || 'Não Informado',
                    cep: cep || 'Não Informado',
                    bairro: bairro || 'Não Informado',
                    endereco: endereco || 'Não Informado',
                    numero: numero || 'Não Informado',
                    uf: uf || 'Não Informado',
                    complemento: complemento || 'Não Informado',
                },
                contato: {
                    telCelular1: telCelular1 || 'Não Informado',
                    telCelular2: telCelular2 || 'Não Informado',
                    telResidencial: telResidencial || 'Não Informado',
                    telComercial: telComercial || 'Não Informado',
                },
                outros: {
                    complementos: {
                        nomepai: nomepai || 'Não Informado',
                        nomemae: nomemae || 'Não Informado',
                        nomeempresa: nomeempresa || 'Não Informado',
                        cargoempresa: cargoempresa || 'Não Informado',
                        trabalhadesde: trabalhadesde || 'Não Informado',
                    },
                    site: site || 'Não Informado',
                    email: email || 'Não Informado',
                },
                observacoes: observacoes || 'Não Informado',
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