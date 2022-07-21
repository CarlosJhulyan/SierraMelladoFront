import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faBed, faBellConcierge,
  faBriefcase, faCalendar, faChartGantt,
  faChartLine,
  faEnvelope, faNewspaper,
  faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {MyContext} from "../../context/AuthContext";

function Sidenav({ color }) {
  const {
    signOutAdmin,
    signOutPatient,
    signOutDoctor,
    authAdmin,
    authPatient,
    authDoctor,
  } = useContext(MyContext);
  const { pathname } = useLocation();

  const isAdminPage = pathname.includes('/admin/');
  const isPatientPage = pathname.includes('/paciente/');
  const isDoctorPage = pathname.includes('/medico/');

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div>
        <img src={logo} alt="Logo header Sierra Mellado" />
      </div>
      <hr />
      {(isAdminPage && authAdmin) &&
        <SidenavAdmin
          signOut={signOutAdmin}
          tables={tables}
        />
      }
      {(isPatientPage && authPatient) &&
        <SidenavPatient
          signOut={signOutPatient}
          tables={tables}
        />
      }
      {(isDoctorPage && authDoctor) &&
        <SidenavDoctor
          signOut={signOutDoctor}
          tables={tables}
        />
      }
    </>
  );
}

const SidenavAdmin = ({ signOut, tables }) => {
  return (
    <>
      <Menu theme="light" mode="inline">
        <Menu.Item className="menu-item-header" key="10">
          Administrador
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/admin/tablero">
            <span className="icon">
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            <span className="label">Tablero Principal</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/admin/oficinas">
            <span className="icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
            <span className="label">Oficinas Administra...</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/admin/buzon-mensajes">
            <span className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span className="label">Buzón de Mensajes</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/admin/trabajadores">
            <span className="icon">
              <FontAwesomeIcon icon={faUserDoctor} />
            </span>
            <span className="label">Trabajadores</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/admin/horarios">
            <span className="icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span className="label">Horarios</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/admin/citas">
            <span className="icon">
              {tables}
            </span>
            <span className="label">Citas</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/admin/articulos">
            <span className="icon">
              <FontAwesomeIcon icon={faNewspaper} />
            </span>
            <span className="label">Articulos</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/admin/servicios">
            <span className="icon">
              <FontAwesomeIcon icon={faBellConcierge} />
            </span>
            <span className="label">Servicios</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9" style={{marginTop: 50}}>
          <NavLink to="/admin/ingreso" onClick={signOut}>
            <span className="icon">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
            <span className="label">Cerrar Sesión</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

const SidenavPatient = ({ signOut, tables }) => {
  return (
    <>
      <Menu theme="light" mode="inline">
        <Menu.Item className="menu-item-header" key="10">
          Paciente
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/paciente/tablero">
            <span className="icon">
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            <span className="label">Tablero Principal</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/paciente/horarios">
            <span className="icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span className="label">Horarios de Médicos</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/paciente/reservar">
            <span className="icon">
              {tables}
            </span>
            <span className="label">Reservar Cita</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/paciente/seguimiento">
            <span className="icon">
              <FontAwesomeIcon icon={faChartGantt} />
            </span>
            <span className="label">Seguimientos</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7" style={{marginTop: 50}}>
          <NavLink to="/paciente/ingreso" onClick={signOut}>
            <span className="icon">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
            <span className="label">Cerrar Sesión</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

const SidenavDoctor = ({ signOut, tables }) => {
  return (
    <>
      <Menu theme="light" mode="inline">
        <Menu.Item className="menu-item-header" key="10">
          Médico
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/medico/tablero">
            <span className="icon">
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            <span className="label">Tablero Principal</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/medico/horarios">
            <span className="icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span className="label">Horarios</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/medico/consultas">
            <span className="icon">
              <FontAwesomeIcon icon={faBed} />
            </span>
            <span className="label">Consultas</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/medico/informes">
            <span className="icon">
              {tables}
            </span>
            <span className="label">Informes</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7" style={{marginTop: 50}}>
          <NavLink to="/medico/ingreso" onClick={signOut}>
            <span className="icon">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
            <span className="label">Cerrar Sesión</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
