import React, {useEffect, useState} from "react";
import {Card, Col, Modal, Row, Table, Typography} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCashRegister, faEye, faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import ModalDetailsDate from "../../components/admin/ModalDetailsDate";
import ModalPdfReport from "../../components/ModalPdfReport";
import {changeStatusOrder} from "../../utils/formsData";

const DatesPage = () => {
  const { Text } = Typography;
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [currentFile, setCurrentFile] = useState(false);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const getDates = () => {
    setLoadingData(true);
    axiosInstance
      .get(apiPath.date.getAll)
      .then(({ data }) => {
        if (data.success) setData(data.data);
        else openNotification('Citas', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Citas',
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
        'Error en la petición',
        'error'
      ));
  }

  const handleChangeStatusOrder = (id) => {
    confirm({
      content: '¿Marcar como revisada la cita?',
      onOk: () => {
        changeStatusOrder({
          id,
          estado: 'R'
        })
          .then(({ message, success }) => {
            if (success) {
              openNotification('Estado de orden', message);
              getDates();
            }
            else openNotification('Estado de orden', message, 'warning');
          })
          .catch(e => openNotification(
            'Estado de orden',
            'Error en la petición',
            'error'
          ));
      },
      okText: 'Revisar',
      cancelText: 'Cancelar',
      centered: true
    });
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
      title: 'PACIENTE',
      dataIndex: 'nombresPaciente',
      key: 'nombresPaciente',
      render: (nombresPaciente, record) => <span>{nombresPaciente} {record.apPaternoPaciente} {record.apMaternoPaciente}</span>
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
            <Text
              title='Marcar como revisado'
              onClick={() => record.estado !== 'P' ? {} : handleChangeStatusOrder(record.numOrden)}
              style={{cursor:record.estado === 'P' && 'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon
                icon={faCashRegister}
                color={record.estado === 'P' ? 'red' : 'green'}
              />
            </Text>
          </div>
        </>
      )
    },
  ];

  useEffect(() => {
    getDates();
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
        setVisible={setVisibleModalDetails}
        visible={visibleModalDetails}
      />

      <ModalPdfReport
        currentFile={currentFile}
        setVisible={setVisibleModalReport}
        visible={visibleModalReport}
      />
    </>
  );
}

export default DatesPage;