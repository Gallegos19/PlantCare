import React from "react";
import NavAdmin from "../../components/Admin-Components/nav-admin/navAdmin";
import Footer from "../../components/footer/footer";
import DeviceTable from "../../components/Admin-Components/DiviceTable/diviceTable";
import UserTable from "../../components/Admin-Components/UserTable/userTable";
import PlantTable from "../../components/Admin-Components/PlantTable/PlantTable";
import style from "./admin.module.css"
export default function Admin() {
    return (
        <div>
            <nav>
                <NavAdmin />
            </nav>
            <main>
                <DeviceTable />
                <PlantTable />
                <UserTable />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}   