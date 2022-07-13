import React, {useEffect, useState} from "react";
import {Card, Col, Row, Table, Typography} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import ModalDetailsDate from "../../components/admin/ModalDetailsDate";

const DatesPage = () => {
  const { Text } = Typography;
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const getDatesByPatient = () => {
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

  const columns = [
    {
      title: '# ORDEN',
      dataIndex: 'numOrden',
      key: 'numOrden',
      render: (numOrden) => <span>{String(numOrden).padStart(9, '0')}</span>
    },
    {
      title: 'DESCRIPCIÓN',
      dataIndex: 'descripcion',
      key: 'descripcion',
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
        setVisible={setVisibleModalDetails}
        visible={visibleModalDetails}
      />
    </>
  );
}

export default DatesPage;