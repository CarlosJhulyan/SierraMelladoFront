import React, {useEffect, useRef, useState} from "react";
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

const ModalUpsertAdmin = ({
                            visible,
                            setVisible,
                            currentAdmin,
                            getAdminsList
}) => {
  const formRef = useRef();
  const [loadingCreateAdmin ,setLoadingCreateAdmin] = useState(false);

  const handleCreateAdmin = async (data) => {
    setLoadingCreateAdmin(true);
    const dataFormat = {
      ...data
    }

    try {
      const { data: dataUser, success: successUser, message } = await createUser(dataFormat);
      if (!successUser) {
        openNotification('Usuario', message, 'warning');
        setLoadingCreateAdmin(false);
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
    setLoadingCreateAdmin(false);
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
          loading={loadingCreateAdmin}
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
        onFinish={handleCreateAdmin}
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
          </Col>
          <Col xl={12} lg={12} md={10} sm={22} xs={22}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalUpsertAdmin;