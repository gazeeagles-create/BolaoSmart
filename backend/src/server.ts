import express from 'express';
import path from 'path';
import { uploadImage } from './controllers/uploadController';

const app = express();

// Middleware para servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para upload de imagens
app.post('/api/upload', uploadImage);

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
