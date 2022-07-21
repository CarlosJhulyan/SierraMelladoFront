import {apiPath, axiosInstance} from "./api";

const sendMessage = async (dataSend) => {
  try {
    const {
      data: { data, message, success }
    } = await axiosInstance.post(apiPath.message.send, dataSend);
    return {
      data,
      message,
      success
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const markToReadMessage = async (dataSend) => {
  try {
    const {
      data: { data, message, success }
    } = await axiosInstance.patch(apiPath.message.markToRead, dataSend);
    return {
      data,
      message,
      success
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const changeStatusAdmin = async (dataSend) => {
  try {
    const {
      data: { data, message, success }
    } = await axiosInstance.patch(apiPath.admin.changeStatus, dataSend);
    return {
      data,
      message,
      success
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createScheduleDoctor = async (dataSend) => {
  try {
    const {
      data: { data, message, success }
    } = await axiosInstance.post(apiPath.doctor.createSchedule, dataSend);
    return {
      data,
      message,
      success
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const deleteSchedule = async (id) => {
  try {
    const {
      data: { message, success }
    } = await axiosInstance.delete(`${apiPath.schedule.delete}/${id}`);
    return {
      message,
      success
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createUser = async (dataSend) => {
  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.admin.createDoctor, dataSend);
    return {
      data,
      message,
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createAdmin = async (dataSend) => {
  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.admin.createAdmin, dataSend);
    return {
      data,
      message,
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createDate = async (dataSend) => {
  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.date.createDate, dataSend);
    return {
      data,
      message,
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createService = async (dataSend) => {
  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.service.create, dataSend);
    return {
      data,
      message,
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createDoctor = async (dataSend) => {
  const formData = new FormData();
  formData.set('codColegiado', dataSend.codColegiado);
  formData.set('idUsuario', dataSend.idUsuario);
  dataSend.celular && formData.set('celular', dataSend.celular);
  formData.set('dni', dataSend.dni);
  formData.set('fechaNac', dataSend.fechaNac);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.admin.createMedico, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createOrder = async (dataSend) => {
  const formData = new FormData();
  formData.set('montoTotal', dataSend.montoTotal);
  formData.set('importeTotal', dataSend.importeTotal);
  formData.set('descripcion', dataSend.vaucher);
  formData.set('estado', 'P');
  formData.set('vuelto', dataSend.vuelto);
  formData.set('codMetodo', dataSend.codMetodo);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.date.createOrder, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createPatient = async (dataSend) => {
  const formData = new FormData();
  formData.set('idUsuario', dataSend.idUsuario);
  dataSend.celular && formData.set('celular', dataSend.celular);
  formData.set('dni', dataSend.dni);
  formData.set('fechaNac', dataSend.fechaNac);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.patient.register, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createArticle = async (dataSend) => {
  const formData = new FormData();
  formData.set('contenido', dataSend.contenido);
  formData.set('autor', dataSend.autor);
  formData.set('imagen', dataSend.imagen);
  formData.set('titulo', dataSend.titulo);
  formData.set('idAdmin', dataSend.idAdmin);

  try {
    const {
      data: { success, message }
    } = await axiosInstance.post(apiPath.article.create, formData);
    return {
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const generateReportToDoctor = async (dataSend) => {
  const formData = new FormData();
  formData.set('idMedico', dataSend.idMedico);
  formData.set('asunto', dataSend.asunto);
  formData.set('archivo', dataSend.archivo);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.report.generateToDoctor, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const generateReportToPatient = async (dataSend) => {
  const formData = new FormData();
  formData.set('medico', dataSend.medico);
  formData.set('paciente', dataSend.paciente);
  formData.set('resumen', dataSend.resumen);
  formData.set('archivo', dataSend.archivo);
  formData.set('cita', dataSend.cita);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.post(apiPath.report.generateToPatient, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const createSpeciality = async (dataSend) => {
  try {
    const {
      data: { success }
    } = await axiosInstance.post(apiPath.doctor.createSpeciality, dataSend);
    return {
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const deleteDoctor = async (id) => {
  try {
    const {
      data: { success, message }
    } = await axiosInstance.delete(`${apiPath.doctor.delete}/${id}`);
    return {
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const deleteAdmin = async (id) => {
  try {
    const {
      data: { success, message }
    } = await axiosInstance.delete(`${apiPath.admin.deleteAdmin}/${id}`);
    return {
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const deleteUser = async (id) => {
  try {
    const {
      data: { success, message }
    } = await axiosInstance.delete(`${apiPath.admin.deleteUser}/${id}`);
    return {
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const changeStatusOrder = async (dataSend) => {
  try {
    const {
      data: { success, message }
    } = await axiosInstance.patch(apiPath.date.changeStatus, dataSend);
    return {
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const changeDoctorAvatar = async (dataSend) => {
  const formData = new FormData();

  formData.set('avatar', dataSend.avatar);
  formData.set('idMedico', dataSend.idMedico);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.patch(apiPath.doctor.changeAvatar, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const changePatientAvatar = async (dataSend) => {
  const formData = new FormData();
  formData.set('avatar', dataSend.avatar);
  formData.set('idPaciente', dataSend.idPaciente);

  try {
    const {
      data: { data, success, message }
    } = await axiosInstance.patch(apiPath.patient.changeAvatar, formData);
    return {
      data,
      success,
      message
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const changePassword = async (dataSend) => {
  try {
    const {
      data: { success, message }
    } = await axiosInstance.patch(apiPath.auth.changePassword, dataSend);
    return {
      message,
      success
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export {
  sendMessage,
  markToReadMessage,
  createScheduleDoctor,
  deleteSchedule,
  createUser,
  createDoctor,
  createSpeciality,
  deleteDoctor,
  deleteUser,
  deleteAdmin,
  createAdmin,
  changeStatusAdmin,
  generateReportToDoctor,
  generateReportToPatient,
  createArticle,
  createService,
  createPatient,
  createOrder,
  createDate,
  changeStatusOrder,
  changePatientAvatar,
  changeDoctorAvatar,
  changePassword,
}