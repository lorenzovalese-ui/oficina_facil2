const express = require('express');
const router = express.Router();

const prisma = require('../prisma');
const validarCliente = require('../middlewares/validarCliente');


// GET - Listar todos os clientes
router.get('/clientes', async (req, res, next) => {
    try {
        const clientes = await prisma.cliente.findMany();

        res.status(200).json(clientes);

    } catch (erro) {
        next(erro);
    }
});


// GET - Buscar cliente por ID
router.get('/clientes/:id', async (req, res, next) => {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.status(200).json(cliente);

    } catch (erro) {
        next(erro);
    }
});


// POST - Criar cliente
router.post('/clientes', validarCliente, async (req, res, next) => {
    try {
        const { nome, email, telefone } = req.body;

        const cliente = await prisma.cliente.create({
            data: {
                nome,
                email,
                telefone
            }
        });

        res.status(201).json(cliente);

    } catch (erro) {
        next(erro);
    }
});


// PUT - Atualizar cliente
router.put('/clientes/:id', validarCliente, async (req, res, next) => {
    try {
        const { nome, email, telefone } = req.body;

        const cliente = await prisma.cliente.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                nome,
                email,
                telefone
            }
        });

        res.status(200).json(cliente);

    } catch (erro) {
        next(erro);
    }
});


// DELETE - Excluir cliente
router.delete('/clientes/:id', async (req, res, next) => {
    try {
        await prisma.cliente.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(200).json({
            mensagem: "Cliente excluído com sucesso"
        });

    } catch (erro) {
        next(erro);
    }
});


module.exports = router;