import {useContext, useEffect} from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Button,
} from "antd";

import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import NotificationsHeader from "../NotificationsHeader";
import {MyContext} from "../../context/AuthContext";

function Header({ name, subName, onPress }) {
  const { authAdmin } = useContext(MyContext);
  const { pathname } = useLocation();

  const isAdminPage = pathname.includes('/admin/');
  const isPatientPage = pathname.includes('/paciente/');
  const isDoctorPage = pathname.includes('/medico/');

  const urlCurrent = isAdminPage ? 'admin' : (isPatientPage ? 'paciente' : (isDoctorPage ? 'medico' : ''));

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={12} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", " / ")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
                <span
                    className="ant-page-header-heading-title"
                    style={{ textTransform: "capitalize" }}
                >
                  {subName.replace("/", " ")}
                </span>
          </div>
        </Col>
        <Col span={12} md={18} className="header-control">
          {/*<Link to="/sign-in" style={{marginRight: 10, marginLeft: 20}}>*/}
          {/*  <FontAwesomeIcon icon={faArrowRightFromBracket} />*/}
          {/*</Link>*/}
          {(isAdminPage && authAdmin) && <NotificationsHeader />}
          <Link to={`/${urlCurrent}/mi-perfil`} style={{marginRight: 20, marginLeft: 10}}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Button
              type="link"
              className="sidebar-toggler"
              onClick={() => onPress()}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
