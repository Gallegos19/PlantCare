import React from "react";
import style from "./adminData.module.css"
import NavAdmin from "../../components/Admin-Components/nav-admin/navAdmin";
import Footer from "../../components/footer/footer";
import GenderPieChart from "../../components/AdminDataComponents/GenderPieChart/genderPieChart";
import UserGrowthChart from "../../components/AdminDataComponents/UserGrowthChart/userGrowthChart";
import PlantPreferencePieChart from "../../components/AdminDataComponents/PlantPreferencePieChart/plantPreferencePieChart";
import GenderPlantPreferenceChart from "../../components/AdminDataComponents/GenderPlantPreferenceChart/genderPlantPreferenceChart";
export default function AdminData(){
    return(
        <div>
            <nav>
                <NavAdmin/>
            </nav>

            <main className={style.mainContent}>
            <h1>Datos de Usuarios</h1>
                <GenderPieChart />
                <UserGrowthChart />
                <PlantPreferencePieChart />
                <GenderPlantPreferenceChart />

            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}