import {React,useState,useEffect,useContext} from "react";
import Nav from "../../components/nav/nav";
import CardListGraph from "../../components/graph/cardListGraph/cardListGraph";
import Footer from "../../components/footer/footer";
import style from "./Graph.module.css"
import PlantContext from "../../components/PlantContext/plantContext";

export default function Graph() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { plants } = useContext(PlantContext); // Obtén las plantas del contexto

    useEffect(() => {
        const loadPlants = () => {
            try {
                
                const localStoragePlants = JSON.parse(localStorage.getItem('plants')) || [];
                
                if (localStoragePlants.length > 0) {
                    // Si hay datos en localStorage, usarlos
                    setLoading(false);
                } else {
                    // Si no hay datos en localStorage, usar el contexto
                    if (plants.length > 0) {
                        setLoading(false);
                    }
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        loadPlants();
    }, [plants]); // Ejecutar el efecto cada vez que cambien las plantas en el contexto

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={style.container}>
            <Nav />
            <CardListGraph plants={plants} />
            <Footer />
        </div>
    );
}