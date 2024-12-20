import { useRef, useEffect } from 'react';
import CabeceraTitle from '../../components/CabeceraTitle/CabeceraTitle';
import JardinVertical from '../../components/JardinVertical/JardinVertical';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import pala from '../../assets/pala.png';
import style from './Login.module.css';

export default function Login() {
  const formularioRef = useRef(null);

  useEffect(() => {
    // Función para hacer scroll automático después de 2 segundos
    const scrollAfterDelay = () => {
      setTimeout(() => {
        if (formularioRef.current && formularioRef.current.scrollIntoView) {
          formularioRef.current.scrollIntoView();
        }
      }, 2000); // Esperar 2 segundos antes de hacer scroll
    };

    scrollAfterDelay(); // Llamar a la función al cargar el componente
  }, []);

  return (
    <div className={style.container}>
      <section className={style.section1}>
        <JardinVertical />
      </section>
      <section className={style.section2}>
        <CabeceraTitle titulo='Iniciar Sesión' />
        <FormularioLogin ref={formularioRef} />
        <img src={pala} alt="" width={'5%'} />
      </section>
    </div>
  );
}
