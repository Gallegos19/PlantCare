import React, { useEffect, useState } from "react";
import style from "./PlantTable.module.css";
import {
  fetchPlants,
  fetchDeletePlantById,
} from "../../../utils/RequestPlant/requestPlant";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function PlantTable() {
  const [plants, setPlants] = useState([]);
  const token = localStorage.getItem('jwt')

  const handleDelete = async (id) => {
    const peticion = await fetchDeletePlantById(id, token);
    if (peticion) {
      console.log(peticion);
      alert(`Planta ${id} eliminado`);
      window.location.reload();
    } else {
      alert("ocurrio un error");
    }
    // Aquí puedes agregar la lógica para eliminar de la planta
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlants(token);
        setPlants(response); // Asumiendo que response es un array de plantas
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.Jardin}>Plantas</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID </th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant.id}>
              <td data-label="ID ">{plant.id}</td>
              <td data-label="Planta">{plant.name}</td>
              <td data-label="Imagen">
                <img src={plant.url_image_plant} alt="" />
              </td>
              <td data-label="Opciones" style={{cursor:'pointer'}}>

                <MdOutlineDeleteSweep
                  color="green"
                  size={25}
                  onClick={() => handleDelete(plant.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
