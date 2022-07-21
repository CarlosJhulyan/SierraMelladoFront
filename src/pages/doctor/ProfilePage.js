import React, {useContext, useRef, useState} from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Form,
  Upload, Input,
} from "antd";

import {
  InboxOutlined,
} from "@ant-design/icons";

import {MyContext, STORAGE_NAME_DOCTOR} from "../../context/AuthContext";
import moment from "moment";
import {baseUrlImage} from "../../config/backend";
import ModalUpsertDoctor from "../../components/admin/ModalUpsertDoctor";
import {changeDoctorAvatar, changePassword} from "../../utils/formsData";
import openNotification from "../../utils/openNotification";

function ProfilePage() {
  const formAvatarRef = useRef();
  const formPassRef = useRef();
  const { authDoctor } = useContext(MyContext);
  const [visibleModalUpsertDoctor, setVisibleModalUpsertDoctor] = useState(false);
  const [loadingChangeAvatar, setLoadingChangeAvatar] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChangePass = (values) => {
    setLoadingChangePass(true);
    changePassword({
      idUsuario: authDoctor.idUsuario,
      clave: values.clave
    })
      .then(({ success, message }) => {
        if (success) {
          openNotification('Cambio de contraseña', message);
          formPassRef.current.resetFields();
        } else openNotification('Cambio de contraseña', message, 'warning');
        setLoadingChangePass(false);
      })
      .catch(e => openNotification(
        'Cambio de contraseña',
        'Error en la petición',
        'error'
      ));
  }

  const handleChangeAvatar = (values) => {
    setLoadingChangeAvatar(true);
    changeDoctorAvatar({
      idMedico: authDoctor.idMedico,
      avatar: values.avatar[0].originFileObj
    })
      .then(({ success, message, data }) => {
        if (success) {
          formAvatarRef.current.resetFields();
          localStorage.setItem(STORAGE_NAME_DOCTOR, JSON.stringify({
            ...authDoctor,
            avatar: data
          }));
          openNotification('Cambio de avatar', message);
        } else openNotification('Cambio de avatar', message, 'warning');
        setLoadingChangeAvatar(false);
      })
      .catch(e => openNotification(
        'Cambio de avatar',
        'Error en la petición',
        'error'
      ));
  }

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          // backgroundImage: "url(" + BgProfile + ")",
          background: 'rgba(72,72,127,0.6)'
        }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src={authDoctor.avatar && baseUrlImage + authDoctor.avatar}
                  style={{background: '#48487F'}}
                >
                  {!authDoctor.avatar && (
                    <>
                      {authDoctor.nombres[0]}{authDoctor.apellidoPaterno[0]}
                    </>
                  )}
                </Avatar>

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{authDoctor.nombres} {authDoctor.apellidoPaterno} {authDoctor.apellidoMaterno}</h4>
                  <p>Código Colegiado: {authDoctor.codColegiado}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      >
      </Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Configurar mi cuenta</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">Cambiar mi contraseña</h6>
              </li>
              <Form
                onFinish={handleChangePass}
                layout='vertical'
                ref={formPassRef}
              >
                <Form.Item
                  name='clave'
                  rules={[
                    {
                      required: true,
                      message: 'Complete el campo!'
                    },
                    {
                      min: 6,
                      message: 'Mínimo de caracteres 6'
                    }
                  ]}
                >
                  <Input.Password size='small' />
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type='primary'
                    htmlType='submit'
                    loading={loadingChangePass}
                  >
                    Cambiar
                  </Button>
                </Form.Item>
              </Form>
              <li>
                <h6 className="list-header text-sm text-muted">Actualizar mi foto de perfil</h6>
              </li>
              <Form
                onFinish={handleChangeAvatar}
                ref={formAvatarRef}
              >
                <Form.Item>
                  <Form.Item
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Adjunte una foto!'
                      }
                    ]}
                  >
                    <Upload.Dragger
                      name='file'
                      method='get'
                      multiple={false}
                      maxCount={1}
                      beforeUpload={file => {
                        const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                        if (!isImage) openNotification('Archivo', 'El archivo tiene que ser de tipo imagen', 'warning');
                        return isImage || Upload.LIST_IGNORE;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Clic aquí o arrastra tu imagen</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type='primary'
                    htmlType='submit'
                    loading={loadingChangeAvatar}
                  >
                    Subir Foto
                  </Button>
                </Form.Item>
              </Form>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={16} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Información de Perfil</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button
                type="link"
                onClick={() => setVisibleModalUpsertDoctor(true)}
              >
                {pencil}
              </Button>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Nombre completo" span={3}>
                {authDoctor.nombres} {authDoctor.apellidoPaterno} {authDoctor.apellidoMaterno}
              </Descriptions.Item>
              <Descriptions.Item label="Celular" span={3}>
                +51 {authDoctor.celular}
              </Descriptions.Item>
              <Descriptions.Item label="Correo" span={3}>
                {authDoctor.correo}
              </Descriptions.Item>
              <Descriptions.Item label="DNI" span={3}>
                {authDoctor.dni}
              </Descriptions.Item>
              <Descriptions.Item label="Código colegiado" span={3}>
                {authDoctor.codColegiado}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha nacimiento" span={3}>
                {moment(authDoctor.fechaNac).format('ll')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {visibleModalUpsertDoctor && (
        <ModalUpsertDoctor
          currentDoctor={authDoctor}
          visible={visibleModalUpsertDoctor}
          setVisible={setVisibleModalUpsertDoctor}
        />
      )}
    </>
  );
}

export default ProfilePage;
