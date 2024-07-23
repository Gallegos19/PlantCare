import { React, useState, useEffect, useContext } from "react";
import Nav from "../../components/nav/nav";
import CardListGraph from "../../components/graph/cardListGraph/cardListGraph";
import Footer from "../../components/footer/footer";
import style from "./Graph.module.css"
import PlantContext from "../../components/PlantContext/plantContext";

export default function Graph() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { plants } = useContext(PlantContext); 

    
    useEffect(() => {
        const loadPlants = async () => {
          try {
            const localStoragePlants = JSON.parse(localStorage.getItem('plants')) || [];
            if (localStoragePlants.length > 0) {
              setLoading(false);
            } else {
              // Aquí podrías hacer una llamada a una API si es necesario
              setLoading(false);
            }
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
      
        loadPlants();
      }, []); // No dependas de `plants`
      
  

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={style.container}>

            <Nav />
            <div className={style.header}>
                <h1 className={style.Jardin}>Graficas</h1>
                <div />
            </div>
            <CardListGraph plants={plants} />
            <Footer />
        </div >
    );
}