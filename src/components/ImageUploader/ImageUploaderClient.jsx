import { useState, useEffect } from 'react';
import Style from "./ImageUploader.module.css"
import placeholderImage from '../../assets/fondopixel.png'; 

function ImageUploaderClient({ imageUrl: initialImageUrl, bandera, setImageUrl }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrlState] = useState(initialImageUrl);

  useEffect(() => {
    setImageUrlState(initialImageUrl);
  }, [initialImageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      handleFileChange(file);
    }
  };

  const handleFileChange = async (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      uploadImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      setImageLoading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "danny20"); 

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drxfjtsnh/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error al subir la imagen: ${JSON.stringify(errorData)}`
        );
      }

      const result = await response.json();
      setImageUrlState(result.secure_url);
      setImageUrl(result.secure_url); // Actualiza la URL de la imagen en el componente padre
      console.log("Imagen subida con éxito:", result.secure_url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className={Style.containerImage}>
      <img
        src={imageUrl ? imageUrl : placeholderImage}
        alt="Uploaded"
        className={Style.image}
      />
      {bandera === 'true' && (
        <input type="file" onChange={handleImageChange} />
      )}
      {imageLoading && <p>Subiendo imagen...</p>}
    </div>
  );
}

export default ImageUploaderClient;
