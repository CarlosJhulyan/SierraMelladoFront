import React, {
  useContext,
  useState,
  useEffect
} from "react";
import {
  Button,
  Card,
  Col, DatePicker, Form, Input,
  Row, Select, Table, TimePicker, Typography
} from "antd";
import {MyContext} from "../../context/AuthContext";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import ModalDetailsDate from "../../components/doctor/ModalDetailsDate";

const DatesPage = () => {
  const { Text } = Typography;
  const { authDoctor } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const getDatesByPatient = () => {
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
        <Row gutter={[24,0]} justify='center'>
          <Col xl={20} lg={20} ms={20} xs={24} className='mb-24'>
            <Card
              title='Nueva consulta'
            >
              <Form
                id='form-dates-doctor'
                labelCol={{
                  span: 9,
                }}
                wrapperCol={{
                  span: 15,
                }}
                layout="horizontal"
              >
                <Row gutter={[24,0]} justify='space-between'>
                  <Col span={11}>
                    <Form.Item label='Paciente'>
                      <Select>

                      </Select>
                    </Form.Item>
                    <Form.Item label='Servicio'>
                      <Select>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label='Fecha de consulta'>
                      <DatePicker
                        placeholder='Elegir fecha'
                        style={{width: '100%'}}
                      />
                    </Form.Item>
                    <Form.Item label='Hora de consulta'>
                      <TimePicker
                        style={{width: '100%'}}
                        placeholder='Seleccionar hora'
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify='end'>
                  <Button
                    type='primary'
                  >
                    Generar
                  </Button>
                </Row>
              </Form>
            </Card>
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
    </>
  );
}

export default DatesPage;