import {useContext, useState} from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  message, Form, Input,
} from "antd";

import BgProfile from "../../assets/images/bg-signup.jpg";
import {MyContext} from "../../context/AuthContext";
import moment from "moment";

function ProfilePage() {
  const { authAdmin } = useContext(MyContext);
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

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
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" style={{background:'#000'}}>
                  {authAdmin.nombres[0]}{authAdmin.apellidoPaterno[0]}
                </Avatar>
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {authAdmin.nombres} {authAdmin.apellidoPaterno} {authAdmin.apellidoMaterno}
                  </h4>
                  <p>Administrador</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Configurar mi cuenta</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">Actualizar mis credenciales</h6>
              </li>
              <Form layout='vertical'>
                <Form.Item label='Nombre de usuario'>
                  <Input />
                </Form.Item>
                <Form.Item label='Contraseña'>
                  <Input.Password size='small' />
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type='primary'
                    disabled
                  >
                    Guardar
                  </Button>
                </Form.Item>
              </Form>
              <li>
                <h6 className="list-header text-sm text-muted">Actualizar mi foto de perfil</h6>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={16} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Información de Administrador</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Nombre completo" span={3}>
                {authAdmin.nombres} {authAdmin.apellidoPaterno} {authAdmin.apellidoMaterno}
              </Descriptions.Item>
              <Descriptions.Item label="Correo" span={3}>
                {authAdmin.correo}
              </Descriptions.Item>
              <Descriptions.Item label="Nombre de usuario" span={3}>
                {authAdmin.usuario}
              </Descriptions.Item>
              <Descriptions.Item label="Rol" span={3}>
                {authAdmin.rol.toUpperCase()}
              </Descriptions.Item>
              <Descriptions.Item label="Estado de cuenta" span={3}>
                {authAdmin.estado == 1 ? 'Activo' : 'No activo'}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de registro" span={3}>
                {moment(authAdmin.fechaCrea).format('lll')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
