import {React,useState,useEffect} from "react";
import Nav from "../../components/nav/nav";
import CardListGraph from "../../components/graph/cardListGraph/cardListGraph";
import Footer from "../../components/footer/footer";
import style from "./Graph.module.css"
import { fetchPlants } from '../../utils/RequestPlant/requestPlant';


export default function Graph() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPlants = async () => {
            try {
                const plantData = await fetchPlants();
                setPlants(plantData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        getPlants();
    }, []);

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