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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faCalendar, faChartGantt} from "@fortawesome/free-solid-svg-icons";

function DashboardPage() {
  const { Title, Text } = Typography;
  const { authPatient } = useContext(MyContext);
  const [dataDates, setDataDates] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [reportsPatient, setReportsPatient] = useState([]);

  const getDatesByPatient = () => {
    setLoadingData(true);
    axiosInstance
      .get(`${apiPath.date.getByPatient}/${authPatient.idPaciente}`)
      .then(({ data }) => {
        if (data.success) setDataDates(data.data);
        else openNotification('Citas de paciente', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Citas de paciente',
        'Error en la peticion',
        'error'
      ));
  }

  const getReports = () => {
    axiosInstance
      .get(`${apiPath.report.getPatientByPatient}/${authPatient.idPaciente}`)
      .then(({ data }) => {
        if (data.success) setReportsPatient(data.data);
        else openNotification('Reportes de pacientes', data.message, 'warning');
      })
      .catch(e =>
        openNotification(
          'Reportes de pacientes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  useEffect(() => {
    getDatesByPatient();
    getReports();
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
            xl={12}
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
            xl={12}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Informes de consultas</span>
                    <Title level={3}>
                      {reportsPatient.length} <small>informes</small>
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
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="h-full">
              <div>
                <Title level={5}>Mis ultimas consultas</Title>
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
