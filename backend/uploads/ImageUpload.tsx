import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.url); // URL da imagem retornada do backend
      setUploading(false);
    } catch (err) {
      setUploading(false);
      setError('Erro ao fazer upload da imagem.');
    }
  };

  return (
    <div>
      <h2>Upload de Imagem</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Carregando...' : 'Fazer Upload'}
      </button>

      {imageUrl && (
        <div>
          <h3>Imagem Enviada com Sucesso!</h3>
          <img src={imageUrl} alt="Imagem enviada" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
