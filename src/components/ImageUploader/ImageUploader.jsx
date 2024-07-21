
import { useState } from 'react';
import Style from './ImageUploader.module.css';
import placeholderImage from '../../assets/fondopixel.png'; 

function ImageUploader(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  let bandera = props.bandera;
  
  console.log(bandera);
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
      {bandera === 'true' ? <input type="file" onChange={handleImageChange} /> : null}

      
    </div>
  );
}

export default ImageUploader;
