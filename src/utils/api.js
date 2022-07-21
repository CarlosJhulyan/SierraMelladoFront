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
    changeStatus: 'Admin/changeEstado',
    updateUsuario: 'Admin/updateUsuario',
    updateAdmin: 'Admin/updateAdmin',
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
    changePassword: 'Auth/changePassword'
  },
  article: {
    getRecent: 'Articulo/getRecentArticulos',
    getRecentHome: 'Articulo/getRecentArticulosHome',
    create: 'Articulo/createArticulo',
    update: 'Articulo/updateArticulo'
  },
  date: {
    getByPatient: 'Cita/getCitasByPaciente',
    getByDoctor: 'Cita/getCitasByMedico',
    getAll: 'Cita/getCitas',
    getDetails: 'Cita/getCitaDetails',
    createOrder: 'Cita/createOrden',
    createDate: 'Cita/createCita',
    searchDate: 'Cita/searchCita',
    changeStatus: 'Cita/changeEstadoOrdenPaciente',
  },
  report: {
    getDoctors: 'Informe/getInformesMedico',
    getPatientDetails: 'Informe/getInformePacienteDetails',
    getPatientByDoctor: 'Informe/getInformePacienteByMedico',
    getPatientByPatient: 'Informe/getInformePacienteByPaciente',
    getPatientByDate: 'Informe/getInformePacienteByCita',
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
    changeAvatar: 'Medico/changeAvatar',
    updateDoctor: 'Medico/updateMedico',
    deleteSpecialities: 'Medico/deleteEspecialidadesByMedico',
  },
  service: {
    create: 'Servicio/createServicio',
    get: 'Servicio/getServicios',
    delete: 'Servicio/deleteServicio',
  },
  patient: {
    register: 'Paciente/register',
    changeAvatar: 'Paciente/changeAvatar',
    updatePatient: 'Paciente/updatePaciente',
  },
  paymentMethod: {
    get: 'MetodoPago/getMetodosPago',
  }
}