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

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import {MyContext} from "../../context/AuthContext";
import moment from "moment";

function ProfilePage() {
  const { authPatient } = useContext(MyContext);

  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);

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
        style={{
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
                  src={authPatient.avatar}
                  style={{background: '#48487F'}}
                >
                  {authPatient.nombres[0]}{authPatient.apellidoPaterno[0]}
                </Avatar>

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{authPatient.nombres} {authPatient.apellidoPaterno} {authPatient.apellidoMaterno}</h4>
                  <p>{authPatient.correo}</p>
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
            title={<h6 className="font-semibold m-0">Información de Perfil</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Nombre completo" span={3}>
                {authPatient.nombres} {authPatient.apellidoPaterno} {authPatient.apellidoMaterno}
              </Descriptions.Item>
              <Descriptions.Item label="Celular" span={3}>
                +51 {authPatient.celular}
              </Descriptions.Item>
              <Descriptions.Item label="Correo" span={3}>
                {authPatient.correo}
              </Descriptions.Item>
              <Descriptions.Item label="DNI" span={3}>
                {authPatient.dni}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha nacimiento" span={3}>
                {moment(authPatient.fechaNac).format('ll')}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-1 px-1">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-1 px-1">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-1 px-1">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
