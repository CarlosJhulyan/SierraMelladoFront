import React, {useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input, Spin,
} from "antd";
import SignInAdmin from "../../assets/images/sign-in-admin.png";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined, HeartFilled,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import {MyContext} from "../../context/AuthContext";

const SignInPage = () => {
  const {
    authAdmin,
    signInAdmin,
    loadingAuthAdmin
  } = useContext(MyContext);
  const { Title } = Typography;
  const { Header, Footer, Content } = Layout;

  const onFinish = (data) => {
    signInAdmin(data)
  }

  return (
    <>
      <Spin spinning={loadingAuthAdmin} tip='Cargando...'>
        <Layout className="layout-default layout-signin-admin">
          <Header>
            <div className="header-col header-brand">
              <Link to='/'><img src={logo} alt="Logo Sierra Mellado" height={50} /></Link>
            </div>
          </Header>
          <Content>
            <Row gutter={[24, 0]} justify="space-between">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15" style={{color:'#ccc'}}>
                  Bienvenido Administrador
                </Title>
                <Form
                  onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Nombre de Usuario"
                    name="user"
                    rules={[
                      {
                        required: true,
                        message: "Introduzca su nombre de usuario!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Contraseña"
                    name="pass"
                    rules={[
                      {
                        required: true,
                        message: "Introduzca su contraseña!",
                      },
                    ]}
                  >
                    <Input.Password size='small' />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginTop: 20 }}
                    >
                      Acceder
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 20 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={SignInAdmin} alt="SignInPage Admin" />
              </Col>
            </Row>
          </Content>
          <Footer>
            <Menu mode="horizontal">
              <Menu.Item>Quienes somos</Menu.Item>
              <Menu.Item>Contactanos</Menu.Item>
              <Menu.Item>Servicios</Menu.Item>
              <Menu.Item>Aprende algo más</Menu.Item>
              <Menu.Item>Libro de reclamaciones</Menu.Item>
              <Menu.Item>Sugerencias</Menu.Item>
            </Menu>
            <Menu mode="horizontal" className="menu-nav-social">
              <Menu.Item>
                <Link to="#">{<TwitterOutlined />}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">{<InstagramOutlined />}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">{<FacebookOutlined />}</Link>
              </Menu.Item>
            </Menu>
            <p className="copyright">
              © {new Date().getFullYear()}, Todos los Derechos Reservados
              {<HeartFilled />}
              <Link to="/" className="font-weight-bold" target="_blank">
                Centro Ginecológico Sierra Mellado
              </Link>
            </p>
          </Footer>
        </Layout>
      </Spin>
      {authAdmin && <Redirect to='/admin/tablero' />}
    </>
  );
}

export default SignInPage;