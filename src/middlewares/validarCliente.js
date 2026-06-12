function validarCliente(req, res, next) {
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({
            erro: "Nome, email e telefone são obrigatórios"
        });
    }

    next();
}

module.exports = validarCliente;