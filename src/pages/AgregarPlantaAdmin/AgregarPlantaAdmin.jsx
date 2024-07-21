import Style from './AgregarPlantaAdmin.module.css';
import NavAdmin from '../../components/Admin-Components/nav-admin/navAdmin';
import Footer from '../../components/footer/footer';
import FormularioPlanta from '../../components/FormularioPlanta/FormularioPlanta';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
export default function AgregarPlantaAdmin() {
  return (
    <div className={Style.containerAgregar}>
        <NavAdmin/>
        <div className={Style.containerSectionAdd}>
            <h2>Agregar nueva planta</h2>
            <div className={Style.containerFormulario}>
            <FormularioPlanta/>
           <ImageUploader bandera='true'/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
