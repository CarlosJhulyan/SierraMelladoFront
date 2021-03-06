import React, {useContext, useEffect, useState} from "react";
import {
  Card,
  Col,
  Row, Table, Typography
} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileInvoice
} from "@fortawesome/free-solid-svg-icons";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {MyContext} from "../../context/AuthContext";
import ModalDetailsDate from "../../components/patient/ModalDetailsDate";
import moment from "moment";
import ModalPdfReport from "../../components/ModalPdfReport";

const TrackingDatesPage = () => {
  const { Text } = Typography;
  const { authPatient } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [currentFile, setCurrentFile] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const getDatesByPatient = () => {
    setLoadingData(true);
    axiosInstance
      .get(`${apiPath.date.getByPatient}/${authPatient.idPaciente}`)
      .then(({ data }) => {
        if (data.success) setData(data.data);
        else openNotification('Citas de paciente', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Citas de paciente',
        'Error en la peticion',
        'error'
      ));
  }

  const handleSelectDate = (record) => {
    setCurrentDate(record);
    setVisibleModalDetails(true);
  }

  const handleGetReportByDate = (idCita) => {
    axiosInstance
      .get(`${apiPath.report.getPatientByDate}/${idCita}`)
      .then(({ data }) => {
        if (data.success) {
          setCurrentFile(data.data.archivo);
          setVisibleModalReport(true);
        }
        else openNotification('Reporte de cita', data.message, 'warning');
      })
      .catch(e => openNotification(
        'Reporte de cita',
        'Error en la petici??n',
        'error'
      ));
  }

  const columns = [
    {
      title: '# ORDEN',
      dataIndex: 'numOrden',
      key: 'numOrden',
      render: (numOrden) => <span>{String(numOrden).padStart(9, '0')}</span>
    },
    {
      title: 'FECHA DE CITA',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha) => <span>{moment(fecha).format('ll')}</span>
    },
    {
      title: 'HORA DE CITA',
      dataIndex: 'hora',
      key: 'hora',
      render: (hora) => <span>{moment(hora, 'H').format('h a')}</span>
    },
    {
      title: 'MEDICO',
      dataIndex: 'nombresMedico',
      key: 'nombresMedico',
      render: (nombresMedico, record) => <span>{nombresMedico} {record.apPaternoMedico} {record.apMaternoMedico}</span>
    },
    {
      title: 'SERVICIO',
      dataIndex: 'servicio',
      key: 'servicio',
    },
    {
      title: 'ACCIONES',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (key, record) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => handleSelectDate(record)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEye} />
            </Text>
            <Text
              onClick={() => handleGetReportByDate(record.idCita)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faFileInvoice} />
            </Text>
            {/*<Text*/}
            {/*  style={{cursor:'pointer', margin: '0 auto'}}*/}
            {/*>*/}
            {/*  <FontAwesomeIcon icon={faAngleRight} />*/}
            {/*</Text>*/}
          </div>
        </>
      )
    },
  ];

  useEffect(() => {
    getDatesByPatient();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]}>
          <Col span={24} className='mb-24'>
            <Card
              title='Todas mis consultas'
            >
              <div className="table-responsive">
                <Table
                  size='small'
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    pageSize: 10,
                  }}
                  loading={loadingData}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <ModalDetailsDate
        currentDate={currentDate}
        visible={visibleModalDetails}
        setVisible={setVisibleModalDetails}
      />

      <ModalPdfReport
        currentFile={currentFile}
        setVisible={setVisibleModalReport}
        visible={visibleModalReport}
      />
    </>
  );
}

export default TrackingDatesPage;