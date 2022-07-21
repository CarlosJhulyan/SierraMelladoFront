import React, {
  useContext,
  useState,
  useEffect
} from "react";
import {
  Button,
  Card,
  Col, DatePicker, Form, Input, Modal,
  Row, Select, Table, TimePicker, Typography
} from "antd";
import {MyContext} from "../../context/AuthContext";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCashRegister, faCheckDouble, faEye, faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import ModalDetailsDate from "../../components/doctor/ModalDetailsDate";
import ModalPdfReport from "../../components/ModalPdfReport";
import {changeStatusOrder} from "../../utils/formsData";

const DatesPage = () => {
  const { confirm } = Modal;
  const { Text } = Typography;
  const { authDoctor } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [currentFile, setCurrentFile] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const getDatesByDoctor = () => {
    setLoadingData(true);
    axiosInstance
      .get(`${apiPath.date.getByDoctor}/${authDoctor.idMedico}`)
      .then(({ data }) => {
        if (data.success) setData(data.data);
        else openNotification('Citas de medico', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Citas de medico',
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
      content: '¿Marcar como atendida la cita?',
      onOk: () => {
        changeStatusOrder({
          id,
          estado: 'A'
        })
          .then(({ message, success }) => {
            if (success) {
              openNotification('Estado de orden', message);
              getDatesByDoctor();
            }
            else openNotification('Estado de orden', message, 'warning');
          })
          .catch(e => openNotification(
            'Estado de orden',
            'Error en la petición',
            'error'
          ));
      },
      okText: 'Atender',
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
              title='Ver detalles'
              onClick={() => handleSelectDate(record)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEye} />
            </Text>
            <Text
              title='Ver informe'
              onClick={() => handleGetReportByDate(record.idCita)}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faFileInvoice} />
            </Text>
            <Text
              title='Marcar como revisado'
              onClick={() => record.estado === 'R' ? handleChangeStatusOrder(record.numOrden) : {}}
              style={{cursor:record.estado === 'R' && 'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon
                icon={faCheckDouble}
                color={record.estado === 'P' ? 'red' : (record.estado === 'R' ? 'green' : 'blue')}
              />
            </Text>
          </div>
        </>
      )
    },
  ];

  useEffect(() => {
    getDatesByDoctor();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center'>
          <Col xl={20} lg={20} ms={20} xs={24} className='mb-24'>
            {/*<Card*/}
            {/*  title='Nueva consulta'*/}
            {/*>*/}
            {/*  <Form*/}
            {/*    id='form-dates-doctor'*/}
            {/*    labelCol={{*/}
            {/*      span: 9,*/}
            {/*    }}*/}
            {/*    wrapperCol={{*/}
            {/*      span: 15,*/}
            {/*    }}*/}
            {/*    layout="horizontal"*/}
            {/*  >*/}
            {/*    <Row gutter={[24,0]} justify='space-between'>*/}
            {/*      <Col span={11}>*/}
            {/*        <Form.Item label='Paciente'>*/}
            {/*          <Select>*/}

            {/*          </Select>*/}
            {/*        </Form.Item>*/}
            {/*        <Form.Item label='Servicio'>*/}
            {/*          <Select>*/}

            {/*          </Select>*/}
            {/*        </Form.Item>*/}
            {/*      </Col>*/}
            {/*      <Col span={11}>*/}
            {/*        <Form.Item label='Fecha de consulta'>*/}
            {/*          <DatePicker*/}
            {/*            placeholder='Elegir fecha'*/}
            {/*            style={{width: '100%'}}*/}
            {/*          />*/}
            {/*        </Form.Item>*/}
            {/*        <Form.Item label='Hora de consulta'>*/}
            {/*          <TimePicker*/}
            {/*            style={{width: '100%'}}*/}
            {/*            placeholder='Seleccionar hora'*/}
            {/*          />*/}
            {/*        </Form.Item>*/}
            {/*      </Col>*/}
            {/*    </Row>*/}
            {/*    <Row justify='end'>*/}
            {/*      <Button*/}
            {/*        type='primary'*/}
            {/*      >*/}
            {/*        Generar*/}
            {/*      </Button>*/}
            {/*    </Row>*/}
            {/*  </Form>*/}
            {/*</Card>*/}
          </Col>
          <Col span={24} className='mb-24'>
            <Card
              title='Mis consultas'
              className='h-full'
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  size='small'
                  dataSource={data}
                  loading={loadingData}
                  pagination={{
                    pageSize: 10
                  }}
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

export default DatesPage;