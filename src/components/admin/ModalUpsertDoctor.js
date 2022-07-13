import React, {useEffect, useRef, useState} from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import moment from "moment";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {createDoctor, createSpeciality, createUser, deleteUser} from "../../utils/formsData";

const ModalUpsertDoctor = ({
                             visible,
                             setVisible,
                             currentDoctor,
                             getDoctorsList
}) => {
  const formRef = useRef();
  const [specialities ,setSpecialities] = useState([]);
  const [loadingSpecialities ,setLoadingSpecialities] = useState(false);
  const [loadingCreateDoctor ,setLoadingCreateDoctor] = useState(false);

  const getSpecialities = () => {
    setLoadingSpecialities(true);
    axiosInstance
      .get(apiPath.speciality.getSpecialities)
      .then(({ data }) => {
        if (data.success) setSpecialities(data.data.map(item => {
          return {
            ...item,
            key: item.codEspecialidad
          }
        }));
        else openNotification('Especialidades', data.message, 'warning');
        setLoadingSpecialities(false);
      })
      .catch(e => openNotification(
        'Especialidades',
        'Error en la petición',
        'error'
      ));
  }

  const handleCreateMedico = async (data) => {
    setLoadingCreateDoctor(true);
    const dataFormat = {
      ...data,
      fechaNac: moment(data.fechaNac._d).format('YYYY-MM-DD')
    }

    try {
      const {
        data: dataUser,
        success: successUser,
        message
      } = await createUser(dataFormat);
      if (!successUser) {
        openNotification('Usuario', message, 'warning');
        setLoadingCreateDoctor(false);
        return;
      }
      dataFormat.idUsuario = dataUser.idUsuario;
      const {
        data: dataDoctor,
        success: successDoctor,
        message: messageDoctor
      } = await createDoctor(dataFormat);
      if (!successDoctor) {
        openNotification('Médico', messageDoctor, 'warning');
        await deleteUser(dataUser.idUsuario);
        setLoadingCreateDoctor(false);
        return;
      }
      dataFormat.idMedico = dataDoctor.idMedico;
      let flag = true;
      for (const item of dataFormat.especialidad) {
        const { success } = await createSpeciality({
          codEspecialidad: item,
          idMedico: dataDoctor.idMedico
        });
        if (!success) flag = false;
        else flag = true;
      }
      if (flag) {
        openNotification('Registro de médico', 'Médico registrado correctamente');
        getDoctorsList();
        formRef.current.resetFields();
        setVisible(false);
      } else openNotification('Registro de médico', 'No se registro el médico', 'warning');
    } catch (e) {
      openNotification('Registro de médico', e.message, 'error');
    }
    setLoadingCreateDoctor(false);
  }

  useEffect(() => {
    if (currentDoctor) {
      formRef.current?.setFieldsValue({
        ...currentDoctor,
        fechaNac: moment(currentDoctor?.fechaNac),
        especialidad: currentDoctor.especialidades.map(item => item.codEspecialidad)
      });
      console.log(currentDoctor)
    } else {
      formRef.current?.resetFields();
    }
  }, [currentDoctor]);

  useEffect(() => {
    getSpecialities();
  }, [])

  return (
    <Modal
      title={currentDoctor ? 'Actualizar Doctor' : 'Crear Doctor'}
      visible={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={[
        <Button
          htmlType='submit'
          form='form-doctor'
          loading={loadingCreateDoctor}
        >
          {currentDoctor ? 'Actualizar' : 'Crear'}
        </Button>
      ]}
    >
      <Form
        id='form-doctor'
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={handleCreateMedico}
        ref={formRef}
        style={{margin:0}}
      >
        <Row justify='space-between'>
          <Col xl={12} lg={11} md={10} sm={22} xs={22}>
            <Form.Item
              label="Nombres"
              name='nombres'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellido Paterno"
              name='apellidoPaterno'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellido Materno"
              name='apellidoMaterno'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nombre de Usuario"
              name='usuario1'
              rules={[
                {
                  required: true,
                  message: 'Necesario para el ingreso!'
                },
                {
                  min: 6,
                  message: 'Tiene que ser mayor a 6 caracteres'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name='clave'
              rules={[
                {
                  required: true,
                  message: 'Ingresa una contraseña!'
                },
                {
                  min: 6,
                  message: 'Tiene que ser mayor a 8 caracteres'
                }
              ]}
            >
              <Input.Password
              size='small'
              />
            </Form.Item>
            <Form.Item
              label="Código Colegiado"
              name='codColegiado'
              rules={[
                {
                  required: true,
                  message: 'Ingresa el número de colegiado'
                },
                {
                  len: 5,
                  message: 'Código de colegiado invalido!',
                }
              ]}
            >
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={11} sm={22} xs={22}>
            <Form.Item
              label="Correo"
              name='correo'
              rules={[
                {
                  type: 'email',
                  message: 'Ingresa un corero valido!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="DNI"
              name='dni'
              rules={[
                {
                  required: true,
                  message: 'Completa el DNI!'
                },
                {
                  len: 8,
                  message: 'El DNI no tiene 8 caracteres!',
                }
              ]}
            >
              <Input type='number' />
            </Form.Item>
            <Form.Item
              label="Celular"
              name='celular'
              rules={[
                {
                  len: 9,
                  message: 'El DNI no tiene 9 caracteres!',
                }
              ]}
            >
              <Input
                type='number'
                prefix='+51'
                size='small'
              />
            </Form.Item>
            <Form.Item
              label="Especialidades"
              name='especialidad'
              rules={[
                {
                  required: true,
                  message: 'Elige al menos 1 especialidad!'
                }
              ]}
            >
              <Select
                mode='multiple'
                size='large'
                placeholder='Selecciona'
                disabled={loadingSpecialities}
              >
                {specialities.map(item => (
                  <Select.Option
                    key={item.codEspecialidad}
                    value={item.codEspecialidad}
                  >
                    {item.descripcion}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Fecha Nacimiento"
              name='fechaNac'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <DatePicker
                style={{width: '100%'}}
                size='large'
                format='DD/MM/YYYY'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpsertDoctor;