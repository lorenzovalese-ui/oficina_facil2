const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET - Listar clientes
router.get('/clientes', async (req, res) => {
    const clientes = await prisma.cliente.findMany();

    res.status(200).json(clientes);
});

// POST - Cadastrar cliente
router.post('/clientes', async (req, res) => {

    const { nome, email, telefone } = req.body;

    const cliente = await prisma.cliente.create({
        data: {
            nome,
            email,
            telefone
        }
    });

    res.status(201).json(cliente);
});

// GET por ID
router.get('/clientes/:id', async (req, res) => {

    const cliente = await prisma.cliente.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    if (!cliente) {
        return res.status(404).json({
            mensagem: 'Cliente não encontrado'
        });
    }

    res.status(200).json(cliente);
});

// DELETE - Remover cliente
router.delete('/clientes/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: id
            }
        });

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado'
            });
        }

        await prisma.cliente.delete({
            where: {
                id: id
            }
        });

        return res.status(204).send();

    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
});

// PUT - Atualizar cliente
router.put('/clientes/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, telefone } = req.body;

        const cliente = await prisma.cliente.findUnique({
            where: { id }
        });

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado'
            });
        }

        const clienteAtualizado = await prisma.cliente.update({
            where: { id },
            data: {
                nome,
                email,
                telefone
            }
        });

        res.status(200).json(clienteAtualizado);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});

module.exports = router;