import {createContext, useEffect, useState} from 'react';
import {apiPath, axiosInstance} from "../utils/api";
import openNotification from "../utils/openNotification";
import useLocalStorageContext from "../utils/useLocalStorageContext";

const INIT_VALUE = {}
export const STORAGE_NAME_ADMIN = 'token-admin';
export const STORAGE_NAME_PATIENT = 'token-patient';
export const STORAGE_NAME_DOCTOR = 'token-doctor';

const MyContext = createContext(INIT_VALUE);

const AuthContext = ({ children }) => {
  const [
    saveStorageAdmin,
    getStorageAdmin,
    removeStorageAdmin
  ] = useLocalStorageContext(STORAGE_NAME_ADMIN);
  const [
    saveStoragePatient,
    getStoragePatient,
    removeStoragePatient
  ] = useLocalStorageContext(STORAGE_NAME_PATIENT);
  const [
    saveStorageDoctor,
    getStorageDoctor,
    removeStorageDoctor
  ] = useLocalStorageContext(STORAGE_NAME_DOCTOR);

  const [authAdmin, setAuthAdmin] = useState(null);
  const [authPatient, setAuthPatient] = useState(null);
  const [authDoctor, setAuthDoctor] = useState(null);
  const [loadingAuthAdmin, setLoadingAuthAdmin] = useState(false);
  const [loadingAuthPatient, setLoadingAuthPatient] = useState(false);
  const [loadingAuthDoctor, setLoadingAuthDoctor] = useState(false);

  const values = {
    authAdmin,
    authPatient,
    authDoctor,
    signInAdmin: (auth) => {
      setLoadingAuthAdmin(true);
      axiosInstance
        .post(apiPath.auth.admin, auth)
        .then(({ data }) => {
          if (data.success) {
            setAuthAdmin(data.data);
            saveStorageAdmin(data.data);
          } else openNotification('Ingreso Administrador', data.message, 'warning');
          setLoadingAuthAdmin(false);
        })
        .catch(() => openNotification('Ingreso Administrador', 'Error en la petición', 'error'));
    },
    signInPatient: (auth) => {
      setLoadingAuthPatient(true);
      axiosInstance
        .post(apiPath.auth.patient, auth)
        .then(({ data }) => {
          if (data.success) {
            setAuthPatient(data.data);
            saveStoragePatient(data.data);
          } else openNotification('Ingreso Paciente', data.message, 'warning');
          setLoadingAuthPatient(false);
        })
        .catch(() => openNotification('Ingreso Paciente', 'Error en la petición', 'error'));
    },
    signInDoctor: (auth) => {
      setLoadingAuthDoctor(true);
      axiosInstance
        .post(apiPath.auth.doctor, auth)
        .then(({ data }) => {
          if (data.success) {
            setAuthDoctor(data.data);
            saveStorageDoctor(data.data);
          } else openNotification('Ingreso Médico', data.message, 'warning');
          setLoadingAuthDoctor(false);
        })
        .catch(() => openNotification('Ingreso Médico', 'Error en la petición', 'error'));
    },
    signOutAdmin: () => {
      removeStorageAdmin();
      setAuthAdmin(null);
    },
    signOutPatient: () => {
      removeStoragePatient();
      setAuthPatient(null);
    },
    signOutDoctor: () => {
      removeStorageDoctor();
      setAuthDoctor(null);
    },
    loadingAuthAdmin,
    loadingAuthPatient,
    loadingAuthDoctor
  }

  useEffect(() => {
    if (getStorageAdmin()) setAuthAdmin(getStorageAdmin());
    if (getStoragePatient()) setAuthPatient(getStoragePatient());
    if (getStorageDoctor()) setAuthDoctor(getStorageDoctor());
  }, [])

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
}

export {
  AuthContext,
  MyContext,
};
