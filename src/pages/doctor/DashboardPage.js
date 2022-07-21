import React, {useContext, useEffect, useState} from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Timeline,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import LineChart from "../../components/chart/LineChart";
import {MyContext} from "../../context/AuthContext";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {faBed, faCalendar, faChartGantt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DashboardPage() {
  const { Title, Text } = Typography;
  const { authDoctor } = useContext(MyContext);
  const [dataDates, setDataDates] = useState([]);
  const [dataSchedules, setDataSchedules] = useState([]);
  const [myReports, setMyReports] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getDatesByDoctor = () => {
    setLoadingData(true);
    axiosInstance
      .get(`${apiPath.date.getByDoctor}/${authDoctor.idMedico}`)
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

  const getMyReports = () => {
    axiosInstance
      .get(`${apiPath.report.getByDoctor}/${authDoctor.idMedico}`)
      .then(({ data }) => {
        if (data.success) setMyReports(data.data);
        else openNotification('Reportes', data.message, 'warning');
      })
      .catch(e =>
        openNotification(
          'Reportes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  const getMySchedules = () => {
    axiosInstance
      .get(`${apiPath.schedule.getByDoctor}/${authDoctor.idMedico}`)
      .then(({ data }) => {
        if (data.success) {
          setDataSchedules(data.data);
        }
        else openNotification('Horarios de medicos', data.message, 'warning');
      })
      .catch(e => openNotification(
        'Horarios de medicos',
        'Error en la petición',
        'error'));
  }

  useEffect(() => {
    getDatesByDoctor();
    getMySchedules();
    getMyReports();
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Todas mis consultas</span>
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
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Informes hasta el momento</span>
                    <Title level={3}>
                      {myReports.length} <small>informes</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faChartGantt} size='2x' />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Horas asignadas por semana</span>
                    <Title level={3}>
                      {dataSchedules.length * 2} <small>horas</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={faCalendar} size='2x' />
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
                <Title level={5}>Mis Últimas Consultas</Title>
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
