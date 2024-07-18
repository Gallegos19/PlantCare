
export const fetchPlants = async () => {
    try {
        const response = await fetch("http://44.197.7.97:8081/api/plant");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log(data.data)
        return data.data;
     
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch("http://44.197.7.97:8081/api/category");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

export const fetchTypes = async () => {
    try {
        const response = await fetch("http://44.197.7.97:8081/api/typePlant");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

export const fetchFamilies = async () => {
    try {
        const response = await fetch("http://44.197.7.97:8081/api/family");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}


export const createPlant = async (plantData) => {
    try {
      const response = await fetch("http://44.197.7.97:8081/api/plant", {
        method: "POST",
        headers: {
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
        }),
      });
  
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
