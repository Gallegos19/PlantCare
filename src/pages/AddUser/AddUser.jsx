import style from './AddUser.module.css';
import NavAdmin from '../../components/Admin-Components/nav-admin/navAdmin';
import Footer from '../../components/footer/footer';
import FormularioRegister from '../../components/FormularioRegister/FormularioRegister';


export default function AddUser() {
  return (
    <div>
        <NavAdmin />
        <FormularioRegister />
        <Footer />
    </div>
  )
}
