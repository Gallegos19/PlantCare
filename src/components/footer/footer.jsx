import React from "react";
import footer from "../../assets/pala_removebg_1.png"
import style from "./footer.module.css"
export default function Footer(){
    return(
        <div className={style.planta}>
            <img src={footer} alt="" />
        </div>
    )
}