import React, {useContext, useEffect, useRef, useState} from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import openNotification from "../../utils/openNotification";
import {createAdmin, createUser} from "../../utils/formsData";
import {apiPath, axiosInstance} from "../../utils/api";
import {MyContext, STORAGE_NAME_ADMIN} from "../../context/AuthContext";

const ModalUpsertAdmin = ({
                            visible,
                            setVisible,
                            currentAdmin,
                            getAdminsList
}) => {
  const { authAdmin } = useContext(MyContext);
  const formRef = useRef();
  const [loadingUpsertAdmin ,setLoadingUpsertAdmin] = useState(false);

  const handleCreateAdmin = async (data) => {
    setLoadingUpsertAdmin(true);
    const dataFormat = {
      ...data
    }

    try {
      const { data: dataUser, success: successUser, message } = await createUser(dataFormat);
      if (!successUser) {
        openNotification('Usuario', message, 'warning');
        setLoadingUpsertAdmin(false);
        return;
      }
      dataFormat.idUsuario = dataUser.idUsuario;
      const { success: successAdmin, message: messageAdmin } = await createAdmin(dataFormat);

      if (successAdmin) {
        openNotification('Registro de personal', messageAdmin);
        getAdminsList();
        formRef.current.resetFields();
        setVisible(false);
      } else openNotification('Registro de personal', messageAdmin, 'warning');
    } catch (e) {
      openNotification('Registro de pesonal', e.message, 'error');
    }
    setLoadingUpsertAdmin(false);
  }

  const handleUpdateAdmin = async (data) => {
    setLoadingUpsertAdmin(true);
    const dataFormat = {
      ...currentAdmin,
      ...data
    }

    console.log(dataFormat)

    try {
      const {
        data: { success: successUser, message: messageUser }
      } = await axiosInstance.put(apiPath.admin.updateUsuario, dataFormat);

      if (!successUser) {
        openNotification('Actualización de personal', messageUser, 'warning');
        setLoadingUpsertAdmin(false);
        return;
      } else {
        if (!getAdminsList) {
          openNotification('Actualización de datos', messageUser + '. Actualiza la pagina para ver los cambios.');
          localStorage.setItem(STORAGE_NAME_ADMIN, JSON.stringify({
            ...authAdmin,
            apellidoMaterno: dataFormat.apellidoMaterno,
            apellidoPaterno: dataFormat.apellidoPaterno,
            nombres: dataFormat.nombres,
            correo: dataFormat.correo,
          }));
          setVisible(false);
        } else {
          openNotification('Actualización de datos', messageUser);
          getAdminsList();
          setVisible(false);
        }
      }
    } catch (e) {
      openNotification('Registro de datos', e.message, 'error');
    }
    setLoadingUpsertAdmin(false);
  }

  const handleUpsertAdmin = async (values) => {
    if (currentAdmin) await handleUpdateAdmin(values);
    else await handleCreateAdmin(values);
  }

  useEffect(() => {
    if (currentAdmin) {
      formRef.current?.setFieldsValue({
        ...currentAdmin,
        rol: currentAdmin.rol.trim()
      });
    } else {
      formRef.current?.resetFields();
    }
  }, [currentAdmin]);

  return (
    <Modal
      title={currentAdmin ? 'Actualizar Personal' : 'Crear Personal'}
      visible={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={[
        <Button
          htmlType='submit'
          form='form-admin'
          loading={loadingUpsertAdmin}
        >
          {currentAdmin ? 'Actualizar' : 'Crear'}
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
        onFinish={handleUpsertAdmin}
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
            {!currentAdmin && (
              <>
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
              </>
            )}
          </Col>
          <Col xl={12} lg={12} md={10} sm={22} xs={22}>
            {currentAdmin && (
              <>
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
              </>
            )}
            {!currentAdmin && (
              <>
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
              </>
            )}
            {!currentAdmin && (
              <Form.Item
                label="Rol"
                name='rol'
                rules={[
                  {
                    required: true,
                    message: 'Selecciona el rol!'
                  }
                ]}
              >
                <Select
                  size='large'
                  placeholder='Selecciona'
                >
                  <Select.Option value='editor'>EDITOR</Select.Option>
                  <Select.Option value='admin'>ADMINISTRADOR</Select.Option>
                  <Select.Option value='lector'>LECTOR</Select.Option>
                </Select>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpsertAdmin;