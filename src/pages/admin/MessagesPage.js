import React, {
  useEffect,
  useState,
  useContext
} from "react";
import {
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Table, Tag,
  Typography
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {markToReadMessage} from "../../utils/formsData";
import {MyContext} from "../../context/AuthContext";
import ModalPdfReport from "../../components/ModalPdfReport";

const MessagesPage = () => {
  const { Text } = Typography;
  const { authAdmin } = useContext(MyContext);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [reportsDoctors, setReportsDoctors] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [currentMessage, setCurrentMessage]= useState({});
  const [visibleModalReportPdf, setVisibleModalReportPdf] = useState(false);
  const [currentFile, setCurrentFile] = useState('');

  const columnsReports = [
    {
      title: '# INFORME',
      dataIndex: "numInforme",
      key: "numInforme",
      render: (numInforme) => <span>{String(numInforme).padStart(5, '0')}</span>
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
      title: 'MEDICO',
      dataIndex: "medico",
      key: "medico",
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
  ]

  const columnsMessages = [
    {
      title: 'TIPO',
      dataIndex: "tipo",
      key: "tipo",
      render: (tipo) => (
        <>
          {tipo === "C" ?
            <FontAwesomeIcon icon={faEnvelope} color='#56BFCF' /> :
            <FontAwesomeIcon icon={faFileCircleExclamation} color='#56BFCF' />
          }
        </>
      )
    },
    {
      title: 'REMITENTE',
      dataIndex: "nombreApellidoRem",
      key: "nombreApellidoRem",
    },
    {
      title: 'CORREO',
      dataIndex: "correoRem",
      key: "correoRem",
    },
    {
      title: 'FECHA',
      dataIndex: "fechaEmi",
      key: "fechaEmi",
      render: (fecha) => (
        <>{moment(fecha).format('ll')}</>
      )
    },
    {
      title: 'ESTADO',
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <>
          {estado === 'P' &&  <Tag color="gold">Pendiente</Tag>}
          {estado === 'A' &&  <Tag color="green">Revisado</Tag>}
        </>
      )
    },
    {
      title: 'REVISAR',
      dataIndex: "key",
      key: "key",
      render: (key, record) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => sendMarkToReadMessage(record)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEye} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const handleSetVisibleFile = (archivo) => {
    setCurrentFile(archivo);
    setVisibleModalReportPdf(true);
  }

  const sendMarkToReadMessage = async (record) =>  {
    setCurrentMessage(record);
    if (record.estado === 'A') return;
    setLoadingMessages(true);
    const { message, success } = await markToReadMessage({
      idMensaje: record.idMensaje,
      idAdmin: authAdmin.idAdmin
    });
    if (success) {
      openNotification('Mensajes', message);
      getPendingMessages();
    }
    else openNotification('Mensajes', message, 'warning');
  }

  const getPendingMessages = () => {
    setLoadingMessages(true);
    axiosInstance
      .get(apiPath.message.getRecent)
      .then(({ data }) => {
        if (data.success) setPendingMessages(data.data);
        else openNotification('Mensajes', data.message, 'warning');
        setLoadingMessages(false);
      })
      .catch(e =>
        openNotification(
          'Mensajes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  const getReportsDoctors = () => {
    setLoadingReports(true);
    axiosInstance
      .get(apiPath.report.getDoctors)
      .then(({ data }) => {
        if (data.success) setReportsDoctors(data.data);
        else openNotification('Reportes', data.message, 'warning');
        setLoadingReports(false);
      })
      .catch(e =>
        openNotification(
          'Reportes',
          'Error al traer los mensajes',
          'error'
        ));
  }

  useEffect(() => {
    getPendingMessages();
    getReportsDoctors();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center'>
          <Col xl={15} lg={15} md={14} sm={24} xs={24} className='mb-24'>
            <Card
              title='Buzón de Mensajes'
              className="h-full"
            >
              <div className="table-responsive">
                <Table
                  columns={columnsMessages}
                  size='small'
                  dataSource={pendingMessages}
                  loading={loadingMessages}
                  pagination={{
                    pageSize: 5,
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xl={9} lg={9} md={10} sm={24} xs={24} className='mb-24'>
            <Card
              title={`Mensaje ${currentMessage.tipo ? (currentMessage.tipo === 'C' ? 'Correo' : 'Reclamo') : ''}`}
              className="h-full"
            >
              <Descriptions>
                <Descriptions.Item span={3} label='Remitente'>{currentMessage.nombreApellidoRem}</Descriptions.Item>
                <Descriptions.Item span={3} label='Correo'>{currentMessage.correoRem}</Descriptions.Item>
                <Descriptions.Item span={3} label='Celular'>{currentMessage.celularRem ? `+51 ${currentMessage.celularRem}` : 'Sin celular'}</Descriptions.Item>
                <Descriptions.Item span={3} label='Fecha'>{moment(currentMessage.fechaEmi).format('LLLL')}</Descriptions.Item>
              </Descriptions>
              <Divider />
              <Descriptions style={{height: 160, overflowY: 'auto'}}>
                <Descriptions.Item span={3} label='Contenido'>{currentMessage.contenido}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={24} className='mb-24'>
            <Card
              title='Informes de Médicos'
            >
              <div className="table-responsive">
                <Table
                  columns={columnsReports}
                  size='small'
                  dataSource={reportsDoctors}
                  loading={loadingReports}
                  pagination={{
                    pageSize: 10,
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
    </>
  )
}

export default MessagesPage;
