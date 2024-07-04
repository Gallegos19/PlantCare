// ImageUploader.js
import { useState } from 'react';
import Style from './ImageUploader.module.css';
import placeholderImage from '../../assets/fondopixel.png'; // Asegúrate de tener una imagen placeholder en tu proyecto

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className={Style.containerImage}>
      <img
        src={selectedImage ? URL.createObjectURL(selectedImage) : placeholderImage}
        alt="Uploaded"
        className={Style.image}
      />
      <input type="file" onChange={handleImageChange} />
    </div>
  );
}

export default ImageUploader;
