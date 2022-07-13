import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {Link} from "react-router-dom";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter>
      <Row className="just">
        <Col xs={24} md={24} lg={24}>
          <div className="copyright">
            © {new Date().getFullYear()}, Todos los Derechos Reservados
            {<HeartFilled />}
            <Link to="/" className="font-weight-bold" target="_blank" style={{color : '#48487F'}}>
              Centro Ginecológico Sierra Mellado
            </Link>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
