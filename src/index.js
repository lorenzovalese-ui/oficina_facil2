const express = require('express');
const app = express();

app.use(express.json());

const oficinaRoutes = require('./routes/oficinaRoutes');

app.use('/api', oficinaRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});