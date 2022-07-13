import {
  baseUrlApi
} from "../config/backend";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiPath = {
  admin: {
    getMedicos: 'Admin/getMedicos',
    getAdmins: 'Admin/getAdmins',
    getPatients: 'Admin/getPacientes',
    createMedico: 'Admin/createMedico',
    createDoctor: 'Admin/createUsuario',
    createAdmin: 'Admin/createAdmin',
    deleteUser: 'Admin/deleteUsuario',
    deleteAdmin: 'Admin/deleteAdmin',
    changeStatus: 'Admin/changeEstado'
  },
  message: {
    getPending: 'Mensaje/getPendientMensajes',
    getRecent: 'Mensaje/getRecentMensajes',
    send: 'Mensaje/createMensaje',
    markToRead: 'Mensaje/changeEstado'
  },
  auth: {
    admin: 'Auth/loginAdmin',
    patient: 'Auth/loginPaciente',
    doctor: 'Auth/loginMedico',
  },
  article: {
    getRecent: 'Articulo/getRecentArticulos',
    getRecentHome: 'Articulo/getRecentArticulosHome',
    create: 'Articulo/createArticulo',
  },
  date: {
    getByPatient: 'Cita/getCitasByPaciente',
    getByDoctor: 'Cita/getCitasByMedico',
    getAll: 'Cita/getCitas',
    getDetails: 'Cita/getCitaDetails',
  },
  report: {
    getDoctors: 'Informe/getInformesMedico',
    getPatientDetails: 'Informe/getInformePacienteDetails',
    getPatientByDoctor: 'Informe/getInformePacienteByMedico',
    getByDoctor: 'Informe/getInformesByMedico',
    generateToDoctor: 'Informe/createReporteMedico',
    generateToPatient: 'Informe/createReportePaciente',
  },
  schedule: {
    getByDoctor: 'Horario/getHorariosByMedico',
    getDoctors: 'Horario/getHorariosMedicos',
    delete: 'Horario/deleteHorario',
  },
  speciality: {
    getSpecialities: 'Especialidad/getEspecialidades',
  },
  doctor: {
    delete: 'Medico/deleteMedico',
    createSchedule: 'Medico/createHorarioMedico',
    createSpeciality: 'Medico/createEspecialidadMedico',
  },
  service: {
    create: 'Servicio/createServicio',
    get: 'Servicio/getServicios'
  },
  patient: {
    register: 'Paciente/register'
  },
  paymentMethod: {
    get: 'MetodoPago/getMetodosPago'
  }
}