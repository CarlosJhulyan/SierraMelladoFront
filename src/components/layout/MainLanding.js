import React, {useState} from "react";
import {
  Drawer,
  Layout, Menu,
} from "antd";

import logo from '../../assets/images/logo-removebg-preview.png';
import {Link, NavLink, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {HeartFilled} from "@ant-design/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChartLine} from "@fortawesome/free-solid-svg-icons";

const MainLanding = ({ children }) => {
  const { Content, Sider } = Layout;
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(!visible);
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "").replace('-', ' ');

  return (
    <Layout className="layout">
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key="left"
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary`}
          >
            <Link to='/'>
              <img src={logo} alt="logotipo" />
            </Link>
            <hr/>
            <Menu theme="light" mode="inline">
              <Menu.Item key="0">
                <NavLink to="/" exact>
                  <span className="label">Inicio</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="1">
                <NavLink to="/galeria">
                  <span className="label">Galería</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/contactenos">
                  <span className="label">Contactenos</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/libro-reclamaciones">
                  <span className="label">Libro Reclamaciones</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to="/servicios">
                  <span className="label">Servicios</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to="/quienes-somos">
                  <span className="label">Quienes Somos</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </Drawer>
      <header id="header" className="fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="logo">
            <Link to='/'>
              <img src={logo} alt="logotipo" />
            </Link>
          </div>
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li><Link to='/'>Inicio</Link></li>
              <li><Link to='/galeria'>Galería</Link></li>
              <li><Link to='/contactenos'>Contactenos</Link></li>
              <li><Link to='/libro-reclamaciones'>Libro Reclamaciones</Link></li>
              <li><Link to='/servicios'>Servicios</Link></li>
              <li><Link to="/quienes-somos">¿Quienes Somos?</Link></li>
            </ul>
            <i
              className="bi bi-list mobile-nav-toggle"
              onClick={openDrawer}
            >
              <FontAwesomeIcon icon={faBars} />
            </i>
          </nav>
        </div>
      </header>

      <Content className="content-ant" style={{marginTop:70}}>
        {children}
      </Content>

      <footer className="text-center text-lg-start text-white footer">
        <section className="footerCont">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Ubícanos</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto separador"/>
                <div className="UbiMap">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.1711660443157!2d-74.23000492946363!3d-13.15692962622056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91127d5b51bfba05%3A0xe804957411fd36d3!2sCentro%20Ginecol%C3%B3gico%20Sierra%20Mellado!5e0!3m2!1ses-419!2spe!4v1657202835987!5m2!1ses-419!2spe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Menú Principal</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto separador"/>
                <p>
                  <Link to="/quienes-somos" className="text-white">¿Quiénes somos?</Link>
                </p>
                <p>
                  <Link to="/contactenos" className="text-white">Contáctenos</Link>
                </p>
                <p>
                  <Link to='/libro-reclamaciones' className="text-white">Libro de reclamaciones</Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Enlaces Externos</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto separador"/>
                <p>
                  <a href="#!" className="text-white">Sistema</a>
                </p>
                <p>
                  <a href="#!" className="text-white">Ayuda</a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Servicios</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto separador"/>
                <p><i className="mr-3"></i> Cirugía Laparoscópica</p>
                <p><i className="mr-3"></i> Ecografías</p>
                <p><i className="mr-3"></i> Biopsias</p>
                <p><i className="mr-3"></i> Crioterapia</p>
                <div>
                  <a href="" className="text-white me-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="" className="text-white me-4">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="" className="text-white me-4">
                    <i className="bi bi-tiktok"></i>
                  </a>
                  <a href="" className="text-white me-4">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4 copyright" style={{color:'#fff'}}>
          © {new Date().getFullYear()}, Todos los Derechos Reservados
          {<HeartFilled />}
          <Link to="/" className="font-weight-bold" target="_blank" style={{color : '#C0D12D'}}>
            Centro Ginecológico Sierra Mellado
          </Link>
        </div>
      </footer>
    </Layout>
  );
}

export default MainLanding;