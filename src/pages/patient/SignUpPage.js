import React, {
  useContext,
  useState
} from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  DatePicker, Spin,
} from "antd";

import {Link, Redirect} from "react-router-dom";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined, HeartFilled,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import moment from "moment";
import {createPatient, createUser, deleteUser} from "../../utils/formsData";
import openNotification from "../../utils/openNotification";
import {MyContext} from "../../context/AuthContext";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignUpPage = () => {
  const [loadingCreatePatient ,setLoadingCreatePatient] = useState(false);
  const {
    authPatient,
    signInPatient,
    loadingAuthPatient,
  } = useContext(MyContext);

  const handleCreatePatient = async (data) => {
    setLoadingCreatePatient(true);
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
        setLoadingCreatePatient(false);
        return;
      }
      dataFormat.idUsuario = dataUser.idUsuario;
      const {
        success: successPatient,
        message: messagePatient
      } = await createPatient(dataFormat);
      if (successPatient) {
        openNotification('Registro de cliente', messagePatient);
        signInPatient({
          pass: dataFormat.clave,
          user: dataFormat.usuario1
        });
      } else {
        await deleteUser(dataUser.idUsuario);
        openNotification('Registro de cliente', messagePatient, 'warning');
      }
      setLoadingCreatePatient(false);
    } catch (e) {
      openNotification('Registro de cliente', e.message, 'error');
    }
    setLoadingCreatePatient(false);
  }

  return (
    <>
      <Spin spinning={loadingCreatePatient || loadingAuthPatient} tip='Cargando...'>
        <div className="layout-default ant-layout layout-sign-up">
          <Header>
            <div className="header-col header-brand">
              <Link to='/'><img src={logo} alt="Logo Sierra Mellado" height={50} /></Link>
            </div>
          </Header>

          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <Title>Nuevo Paciente</Title>
                <p className="text-lg">
                  Pronto podrás acceder a todos los servicios de la clínica odontológica Sierra Mellado
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Registrarme</h5>}
              bordered="false"
            >
              <Form
                name="form-register-patient"
                initialValues={{ remember: true }}
                onFinish={handleCreatePatient}
              >
                <Form.Item
                  name="nombres"
                  rules={[
                    {
                      required: true,
                      message: "Complete este campo!"
                    },
                  ]}
                >
                  <Input placeholder="Nombres" />
                </Form.Item>
                <Form.Item
                  name="apellidoPaterno"
                  rules={[
                    {
                      required: true,
                      message: "Complete este campo!"
                    },
                  ]}
                >
                  <Input placeholder="Apellido paterno" />
                </Form.Item>
                <Form.Item
                  name="apellidoMaterno"
                  rules={[
                    {
                      required: true,
                      message: "Complete este campo!"
                    },
                  ]}
                >
                  <Input placeholder="Apellido materno" />
                </Form.Item>
                <Form.Item
                  name="correo"
                  rules={[
                    {
                      required: true,
                      message: "Agrega un correo electrónico!"
                    },
                    {
                      type: 'email',
                      message: 'Ingrese un correo valido!'
                    }
                  ]}
                >
                  <Input placeholder="Correo" />
                </Form.Item>
                <Form.Item
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
                  <Input type='number' placeholder='DNI' />
                </Form.Item>
                <Form.Item
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
                    size='small'
                    placeholder='Número de celular'
                  />
                </Form.Item>
                <Form.Item
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
                    placeholder='Fecha de nacimiento'
                  />
                </Form.Item>
                <Form.Item
                  name="usuario1"
                  rules={[
                    {
                      required: true,
                      message: "Agrega tu nombre de usuario!"
                    },
                    {
                      min: 6,
                      message: 'Mínimo de caracteres 6'
                    }
                  ]}
                >
                  <Input placeholder="Nombre de usuario" />
                </Form.Item>
                <Form.Item
                  name='clave'
                  rules={[
                    {
                      required: true,
                      message: "Introduzca una contraseña!"
                    },
                    {
                      min: 6,
                      message: 'Mínimo de caracteres 6'
                    }
                  ]}
                >
                  <Input.Password
                    size='small'
                    placeholder="Contraseña"
                  />
                </Form.Item>

                <Form.Item name="privacy">
                  <Checkbox>
                    Acepto los{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terminos de privacidad
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    CONFIRMAR
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                ¿Ya eres cliente nuestro?{" "}
                <Link to="/paciente/ingreso" className="font-bold text-dark">
                  Ingresar
                </Link>
              </p>
            </Card>
          </Content>
          <Footer>
            <Menu mode="horizontal">
              <Menu.Item><Link to='/quienes-somos'>Quienes somos</Link></Menu.Item>
              <Menu.Item><Link to='/contactenos'>Contactanos</Link></Menu.Item>
              <Menu.Item><Link to='/servicios'>Servicios</Link></Menu.Item>
              <Menu.Item><Link to='/libro-reclamaciones'>Libro de reclamaciones</Link></Menu.Item>
              <Menu.Item><Link to='/galeria'>Galería</Link></Menu.Item>
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
        </div>
      </Spin>
      {authPatient && <Redirect to='/paciente/tablero' />}
    </>
  );
}

export default SignUpPage