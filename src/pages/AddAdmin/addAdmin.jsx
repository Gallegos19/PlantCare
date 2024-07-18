import React, { useState } from "react";
import NavAdmin from "../../components/Admin-Components/nav-admin/navAdmin";
import Footer from "../../components/footer/footer";
import AddCard from "../../components/AddAdminComponents/AddCard/addCard";
import { useNavigate } from "react-router-dom";
import style from "./addAdmin.module.css";
import { GiPlantRoots } from "react-icons/gi";
import { BsDeviceHdd } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";

export default function AddAdmin() {
    const navigate = useNavigate();

    const handleCardClick = (type) => {
        switch (type) {
            case "planta":
                navigate("/agregarplantaadmin");
                break;
            case "usuario":
                navigate("/register");
                break;
            case "dispositivo":
                navigate("/addDevice");
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <nav>
                <NavAdmin />
            </nav>
            <main className={style.mainContent}>
                <div className={style.cardsContainer}>
                    <AddCard title="Agregar Planta" onClick={() => handleCardClick("planta")} icon={<GiPlantRoots />} />
                    <AddCard title="Agregar Usuario" onClick={() => handleCardClick("usuario")} icon={<FaUserCheck />} />
                    <AddCard title="Agregar Dispositivo" onClick={() => handleCardClick("dispositivo")} icon={<BsDeviceHdd />} />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
