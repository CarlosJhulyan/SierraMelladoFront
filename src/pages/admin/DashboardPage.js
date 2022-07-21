import React, {useEffect, useState} from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Timeline,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import LineChart from "../../components/chart/LineChart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBed,
  faEnvelope,
  faNewspaper,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";

function DashboardPage() {
  const { Title, Text } = Typography;
  const [dataDoctors, setDataDoctors] = useState([]);
  const [dataDates, setDataDates] = useState([]);
  const [articles, setArticles] = useState([]);
  const [pendentMessages, setPendentMessages] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getDoctorsList = () => {
    axiosInstance
      .get(apiPath.admin.getMedicos)
      .then(({ data }) => {
        if (data.success) setDataDoctors(data.data);
        else openNotification('Médicos', data.message, 'warning');
      })
      .catch(e => openNotification(
      'Médicos',
      'Error en la petición de lista doctores',
      'error'));
  }

  const getRecentArticles = () => {
    axiosInstance
      .get(apiPath.article.getRecent)
      .then(({ data }) => {
        if (data.success) setArticles(data.data);
        else openNotification('Articulos', data.message, 'warning');
      })
      .catch(e => openNotification(
        'Articulos',
        'Error en la petición',
        'error'));
  }

  const getAllDates = () => {
    setLoadingData(true);
    axiosInstance
      .get(apiPath.date.getAll)
      .then(({ data }) => {
        if (data.success) setDataDates(data.data);
        else openNotification('Citas de medico', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Citas de medico',
        'Error en la petición',
        'error'
      ));
  }

  const getPendientMessages = () => {
    setLoadingData(true);
    axiosInstance
      .get(apiPath.message.getPending)
      .then(({ data }) => {
        if (data.success) setPendentMessages(data.data);
        else openNotification('Mensajes', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e =>
        openNotification('Mensajes', 'Error al traer los mensajes', 'error'));
  }

  useEffect(() => {
    getDoctorsList();
    getAllDates();
    getRecentArticles();
    getPendientMessages();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Médicos hasta momento</span>
                    <Title level={3}>
                      {dataDoctors.length} <small>médicos</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faUserDoctor} size='2x' />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Consultas totales</span>
                    <Title level={3}>
                      {dataDates.length} <small>consultas</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faBed} size='2x' />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Artículos publicados</span>
                    <Title level={3}>
                      {articles.length} <small>artículos</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faNewspaper} size='2x' />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Buzón de mensajes</span>
                    <Title level={3}>
                      {pendentMessages.length} <small>mensajes pendientes</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="h-full">
              <div>
                <Title level={5}>Consultas recientes</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  últimas 5 consultas
                </Paragraph>
                <Timeline
                  pending={loadingData && "Cargando..."}
                  className="timelinelist"
                >
                  {dataDates.filter((item, index) => index < 5).map((t, index) => (
                    <Timeline.Item color='#48487F' key={index}>
                      <Title level={5}>{t.descripcion}</Title>
                      <Text>Reserva para: {moment(t.fecha).format('LLLL')}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashboardPage;
