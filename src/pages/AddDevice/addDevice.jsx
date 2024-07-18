import React from 'react';
import NavAdmin from '../../components/Admin-Components/nav-admin/navAdmin';
import Footer from '../../components/footer/footer';
import DeviceForm from '../../components/DeviceForm/DeviceForm';
import style from "./addDevice.module.css"
import ImageUploader from '../../components/ImageUploader/ImageUploader';
export default function AddDevice() {
  return (
    <div>
      <NavAdmin />
      <div className={style.containerSectionAdd}>
      <DeviceForm/>
      <ImageUploader bandera='true' />
      </div>
      <Footer />
    </div>
  );
}
