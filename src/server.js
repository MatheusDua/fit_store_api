import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor FitStore rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}/vitrine`);
    console.log(`\n*-------------------------------------*\n\n`);
});