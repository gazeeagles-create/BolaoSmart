import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Diretório onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para upload de imagem
export const uploadImage = [
  upload.single('image'), // O campo que o frontend envia é chamado 'image'
  (req: Request, res: Response) => {
    if (req.file) {
      const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
      return res.json({ url: imageUrl });
    }
    return res.status(400).json({ error: 'Erro no upload da imagem' });
  },
];
