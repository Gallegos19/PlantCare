export const createPlant = async (plantData) => {
    try {
      // Reemplaza 'https://api.tuservidor.com/plants' con la URL de tu API
      const response = await fetch('https://api.tuservidor.com/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar otros headers si es necesario
        },
        body: JSON.stringify(plantData),
      });
  
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al crear la planta: ' + response.statusText);
      }
  
      // Parsear la respuesta JSON
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al crear la planta:', error);
      throw error;
    }
  };