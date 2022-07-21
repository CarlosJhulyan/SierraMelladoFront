import React, {
  useContext,
  useState,
  useEffect
} from "react";
import {
  Button,
  Card,
  Col, Radio,
  Row, Table, Typography
} from "antd";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {MyContext} from "../../context/AuthContext";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import ModalPdfReport from "../../components/ModalPdfReport";
import ModalGenerateReport from "../../components/doctor/ModalGenerateReport";
import ModalGenerateMyReport from "../../components/doctor/ModalGenerateMyReport";

const ReportsPage = () => {
  const { Text } = Typography;
  const { authDoctor } = useContext(MyContext);
  const [myReports, setMyReports] = useState([]);
  const [loadingMyReports, setLoadingMyReports] = useState(false);
  const [reportsPatients, setReportsPatient] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [visibleModalReportPdf, setVisibleModalReportPdf] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [visibleModalGenerateMyReport, setVisibleModalGenerateMyReport] = useState(false);
  const [visibleModalGenerateReport, setVisibleModalGenerateReport] = useState(false);

  const columnsMyReports = [
    {
      title: '# INFORME',
      dataIndex: "numInforme",
      key: "numInforme",
      render: (numInforme) => <span>INM-{String(numInforme).padStart(5, '0')}</span>
    },
    {
      title: 'MES',
      dataIndex: "fechaEmi",
      key: "fechaEmi",
      render: (fechaEmi) => <span>{moment(fechaEmi).format('MMMM').toUpperCase()}</span>
    },
    {
      title: 'FECHA DE EMISION',
      dataIndex: "fechaEmi",
      key: "fechaEmi",
      render: (fechaEmi) => <span>{moment(fechaEmi).format('LL')}</span>
    },
    {
      title: 'ASUNTO',
      dataIndex: "asunto",
      key: "asunto",
    },
    {
      title: 'INFORME',
      dataIndex: "archivo",
      key: "archivo",
      align: 'center',
      render: (archivo) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => handleSetVisibleFile(archivo)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEye} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const getMyReports = () => {
    setLoadingMyReports(true);
    axiosInstance
      .get(`${apiPath.report.getByDoctor}/${authDoctor.idMedico}`)
      .then(({ data }) => {
        if (data.success) setMyReports(data.data);
        else openNotification('Reportes', data.message, 'warning');
        setLoadingMyReports(false);
      })
      .catch(e =>
        openNotification(
          'Reportes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  const getReports = () => {
    setLoadingReports(true);
    axiosInstance
      .get(`${apiPath.report.getPatientByDoctor}/${authDoctor.idMedico}`)
      .then(({ data }) => {
        if (data.success) setReportsPatient(data.data);
        else openNotification('Reportes de pacientes', data.message, 'warning');
        setLoadingReports(false);
      })
      .catch(e =>
        openNotification(
          'Reportes de pacientes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  const handleSetVisibleFile = (archivo) => {
    setCurrentFile(archivo);
    setVisibleModalReportPdf(true);
  }

  const columnsReportsPatients = [
    {
      title: '# INFORME',
      dataIndex: "numInforme",
      key: "numInforme",
      render: (numInforme) => <span>INP-{String(numInforme).padStart(5, '0')}</span>
    },
    {
      title: 'MES',
      dataIndex: "fechaEmi",
      key: "fechaEmi",
      render: (fechaEmi) => <span>{moment(fechaEmi).format('MMMM')}</span>
    },
    {
      title: 'FECHA DE EMISION',
      dataIndex: "fechaEmi",
      key: "fechaEmi",
      render: (fechaEmi) => <span>{moment(fechaEmi).format('LL')}</span>
    },
    {
      title: 'RESUMEN',
      dataIndex: "resumen",
      key: "resumen",
    },
    {
      title: 'PACIENTE',
      dataIndex: "paciente",
      key: "paciente",
    },
    {
      title: 'INFORME',
      dataIndex: "archivo",
      key: "archivo",
      align: 'center',
      render: (archivo) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => handleSetVisibleFile(archivo)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEye} />
            </Text>
          </div>
        </>
      )
    },
  ];

  useEffect(() => {
    getMyReports();
    getReports();
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center'>
          <Col xl={24} lg={24} md={24} xs={24} className='mb-24'>
            <Card
              className="h-full"
              title='Mis informes mensuales'
              extra={
                <>
                  <Button onClick={() => setVisibleModalGenerateMyReport(true)}>
                    Generar informe
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columnsMyReports}
                  size='small'
                  pagination={{
                    pageSize: 5
                  }}
                  loading={loadingMyReports}
                  dataSource={myReports}
                />
              </div>
            </Card>
          </Col>
          <Col xl={24} lg={24} md={24} xs={24} className='mb-24'>
            <Card
              className="h-full"
              title='Informes de pacientes'
              extra={
                <>
                  <Button onClick={() => setVisibleModalGenerateReport(true)}>
                    Generar informe
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={reportsPatients}
                  loading={loadingReports}
                  columns={columnsReportsPatients}
                  size='small'
                  pagination={{
                    pageSize: 5
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <ModalPdfReport
        visible={visibleModalReportPdf}
        setVisible={setVisibleModalReportPdf}
        currentFile={currentFile}
      />

      <ModalGenerateMyReport
        visible={visibleModalGenerateMyReport}
        setVisible={setVisibleModalGenerateMyReport}
        getMyReports={getMyReports}
      />

      <ModalGenerateReport
        getReports={getReports}
        setVisible={setVisibleModalGenerateReport}
        visible={visibleModalGenerateReport}
      />
    </>
  );
}

export default ReportsPage;