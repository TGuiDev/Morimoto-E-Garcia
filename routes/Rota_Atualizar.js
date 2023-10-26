const express = require('express');
const router = express.Router();
const Cliente = require('../schemas/cliente')
const VerificarLogin = require('../middleware/VerificarLogin');
// Rota para atualizar o cliente
router.post('/:id', VerificarLogin, async (req, res) => {
    const id = req.params.id;
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
    
    try {
        const cliente = await Cliente.findByIdAndUpdate(id, {
            $set: {
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
                }
            }
        }, { new: true });

        if (!cliente) {
            return res.status(404).send('Cliente não encontrado.');
        }

        res.redirect('/clientes/' + id);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar o cliente');
    }
});

module.exports = router;