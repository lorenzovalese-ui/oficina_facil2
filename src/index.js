const express = require('express');
const morgan = require('morgan');

const oficinaRoutes = require('./routes/oficinaRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());


// Logs das requisições
app.use(morgan('dev'));


// Rotas da API
app.use('/api', oficinaRoutes);


// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});


// Tratamento de erros
app.use(errorHandler);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});