import React from "react";
import NavAdmin from "../../components/Admin-Components/nav-admin/navAdmin";
import Footer from "../../components/footer/footer";
import DeviceTable from "../../components/Admin-Components/DiviceTable/diviceTable";
import style from "./admin.module.css"
export default function Admin() {
    return (
        <div>
            <nav>
                <NavAdmin />
            </nav>
            <main>
                <DeviceTable />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}   