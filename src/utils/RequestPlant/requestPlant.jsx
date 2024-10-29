export const fetchPlants = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/plant",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchCategories = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/category",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchTypes = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/typePlant",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchFamilies = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/family",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const createPlant = async (plantData, token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/plant",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: plantData.name,
          name_scientific: plantData.name_scientific,
          humidity_earth: plantData.humidity_earth,
          humidity_environment: plantData.humidity_environment,
          brightness: plantData.brightness,
          ambient_temperature: plantData.ambient_temperature,
          mq135: plantData.mq135,
          categories: plantData.categories,
          types: plantData.types,
          families: plantData.families,
          url_image_plant: plantData.url_image_plant,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const createDevice = async (deviceData, token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/device",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: deviceData.user.email,
          name_plant: deviceData.name,
          mac: deviceData.mac,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error desconocido");
    }

    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    throw error;
  }
};

export const createUser = async (userData, token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/users",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          last_name: userData.last_name,
          password: userData.password,
          rol: userData.rol,
          gender: userData.gender,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error desconocido");
    }

    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    throw error;
  }
};

export const fetchDevice = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/device",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchUsers = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data; // Asegúrate de que 'data.data' es un array de usuarios
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchUserbyEmail = async (name,token) => {
  try {
    const response = await fetch(
      `http://34.204.57.249:8081/api/users/by-email/${name}`,
      {
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchHealth = async (token) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/health",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data; // Asegúrate de que 'data.data' es un array de usuarios
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchDeviceByemail = async (token) => {
  try {
    const email = localStorage.getItem("userEmail");
    const response = await fetch(
      `http://34.204.57.249:8081/api/device/email?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log("Fetched data:", data); // Verifica los datos

    // Extrae las plantas y la MAC de cada dispositivo
    const plants = data.data
      .map((device) => ({
        ...device.plant,
        mac: device.mac, // Incluye la MAC en cada planta
      }))
      .filter((plant) => plant);

    console.log("Plants extracted:", plants); // Verifica las plantas extraídas

    return {
      plants,
      macs: data.data.map((device) => ({
        plantId: device.plant.id,
        mac: device.mac,
      })),
    };
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchDeviceByMac = async (mac, token) => {
  try {
    const response = await fetch(
      `http://34.204.57.249:8081/api/device/mac?macAddress=${mac}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log("Fetched data by MAC:", data); // Verifica los datos
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchDeleteDeviceByMac = async (mac, token) => {
  try {
    // Cambia el método a DELETE
    const response = await fetch(
      `http://34.204.57.249:8081/api/device/mac?macAddress=${mac}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Si es necesario, puedes analizar la respuesta
    const data = await response.json();
    console.log("Device deleted successfully:", data); // Verifica la respuesta de la eliminación

    // Retorna la respuesta si necesitas manejarla más adelante
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchDeletePlantById = async (id, token) => {
  try {
    // Cambia el método a DELETE
    const response = await fetch(
      `http://34.204.57.249:8081/api/plant/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Si es necesario, puedes analizar la respuesta
    const data = await response.json();
    console.log("Device deleted successfully:", data); // Verifica la respuesta de la eliminación

    // Retorna la respuesta si necesitas manejarla más adelante
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const fetchLogin = async (UserData) => {
  try {
    const response = await fetch(
      "http://34.204.57.249:8081/api/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserData.email,
          password: UserData.password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
