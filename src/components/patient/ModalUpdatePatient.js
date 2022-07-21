import React, {useContext, useEffect, useRef, useState} from "react";
import {
  Button,
  Col, DatePicker,
  Form,
  Input,
  Modal,
  Row,
} from "antd";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {apiPath, axiosInstance} from "../../utils/api";
import {MyContext, STORAGE_NAME_PATIENT} from "../../context/AuthContext";

const ModalUpdatePatient = ({
                            visible,
                            setVisible,
                            currentPatient,
}) => {
  const formRef = useRef();
  const { authPatient } = useContext(MyContext);
  const [loadingUpdatePatient ,setLoadingUpdatePatient] = useState(false);
  const handleUpdatePatient = async (data) => {
    setLoadingUpdatePatient(true);
    const dataFormat = {
      ...currentPatient,
      ...data,
      fechaNac: moment(data.fechaNac._d).format('YYYY-MM-DD')
    }

    try {
      const {
        data: { success: successUser, message: messageUser }
      } = await axiosInstance.put(apiPath.admin.updateUsuario, dataFormat);

      if (!successUser) {
        openNotification('Actualización de usuario', messageUser, 'warning');
        setLoadingUpdatePatient(false);
        return;
      }

      const {
        data: { success: successPatient, message: messagePatient }
      } = await axiosInstance.put(apiPath.patient.updatePatient, dataFormat);

      if (successPatient) {
        openNotification('Actualización de datos', messagePatient + '. Actualiza la pagina para ver los cambios.');
        localStorage.setItem(STORAGE_NAME_PATIENT, JSON.stringify({
          ...authPatient,
          apellidoMaterno: dataFormat.apellidoMaterno,
          apellidoPaterno: dataFormat.apellidoPaterno,
          nombres: dataFormat.nombres,
          dni: dataFormat.dni,
          fechaNac: dataFormat.fechaNac,
          correo: dataFormat.correo,
          celular: dataFormat.celular,
        }));
        setVisible(false);
      } else openNotification('Actualización de datos', messagePatient, 'warning');
    } catch (e) {
      openNotification('Actualización de datos', e.message, 'error');
    }
    setLoadingUpdatePatient(false);
  }

  useEffect(() => {
    if (currentPatient) {
      formRef.current?.setFieldsValue({
        ...currentPatient,
        fechaNac: moment(currentPatient?.fechaNac),
      });
    } else {
      formRef.current?.resetFields();
    }
  }, [currentPatient]);

  return (
    <Modal
      title={currentPatient ? 'Actualizar Personal' : 'Crear Personal'}
      visible={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={[
        <Button
          htmlType='submit'
          form='form-admin'
          loading={loadingUpdatePatient}
        >
          {currentPatient ? 'Actualizar' : 'Crear'}
        </Button>
      ]}
    >
      <Form
        id='form-admin'
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
        onFinish={handleUpdatePatient}
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
          <Col xl={12} lg={12} md={10} sm={22} xs={22}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpdatePatient;