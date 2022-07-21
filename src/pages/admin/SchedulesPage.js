import React, {
  useEffect, useRef,
  useState
} from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form, Popconfirm,
  Row,
  Select,
  Table,
  TimePicker
} from "antd";
import {
  apiPath,
  axiosInstance
} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {createScheduleDoctor, deleteSchedule} from "../../utils/formsData";
import moment from "moment";
import {schedulesInit} from "../../config/schedules";

const SchedulesPage = () => {
  const formRef = useRef();
  const [dataSchedules, setDataSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [dataDoctors, setDataDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingCreateSchedule, setLoadingCreateSchedule] = useState(false);
  const [schedules, setSchedules] = useState(schedulesInit);

  const getSchedulesDoctors = () => {
    setLoadingSchedules(true);
    axiosInstance
      .get(apiPath.schedule.getDoctors)
      .then(({ data }) => {
        if (data.success) {
          setDataSchedules(data.data);
        }
        else openNotification('Horarios de medicos', data.message, 'warning');
        setLoadingSchedules(false);
      })
      .catch(e => openNotification(
        'Horarios de medicos',
        'Error en la petición',
        'error'));
  }

  const getDoctorsList = () => {
    setLoadingDoctors(true);
    axiosInstance
      .get(apiPath.admin.getMedicos)
      .then(({ data }) => {
        if (data.success) setDataDoctors(data.data);
        else openNotification('Médicos', data.message, 'warning');
        setLoadingDoctors(false);
      })
      .catch(e => openNotification(
        'Médicos',
        'Error en la petición de lista doctores',
        'error'));
  }

  const handleDeleteSchedule = async (id) => {
    const { success, message } = await deleteSchedule(id);
    if (success) {
      getSchedulesDoctors();
      openNotification('Horario', message);
    } else openNotification('Horario', message, 'warning');
  }

  const handleCreateSchedule = async (e) => {
    setLoadingCreateSchedule(true);
    const { message, success } = await createScheduleDoctor({
      ...e,
      horaInicio: moment(e.horaInicio).format('H'),
      horaFin: moment(e.horaFin).format('H'),
    });
    if (success) {
      openNotification('Horario', message);
      getSchedulesDoctors();
      formRef.current.resetFields();
    } else openNotification('Horario', message, 'warning');
    setLoadingCreateSchedule(false);
  }

  const columnsSchedules = [
    {
      title: 'Horas',
      dataIndex: 'hora',
      key: 'hora',
      align: 'center',
      width: 100,
      render: (hora) =>
        <span
          style={{fontWeight:'bold',color:'#C0D12D'}}
        >
          {hora}
        </span>
    },
    {
      title: 'Lunes',
      dataIndex: 'lunes',
      key: 'lunes',
      align: 'center',
      width: 100,
      render: (lunes, record) => (
        <>
          {lunes === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {lunes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${record.lunes}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {lunes}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Martes',
      dataIndex: 'martes',
      key: 'martes',
      align: 'center',
      width: 100,
      render: (martes, record) => (
        <>
          {martes === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {martes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${martes}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {martes}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Miércoles',
      dataIndex: 'miercoles',
      key: 'miercoles',
      align: 'center',
      width: 100,
      render: (miercoles, record) => (
        <>
          {miercoles === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {miercoles}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${miercoles}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {miercoles}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Jueves',
      dataIndex: 'jueves',
      key: 'jueves',
      align: 'center',
      width: 100,
      render: (jueves, record) => (
        <>
          {jueves === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {jueves}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${jueves}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {jueves}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Viernes',
      dataIndex: 'viernes',
      key: 'viernes',
      align: 'center',
      width: 100,
      render: (viernes, record) => (
        <>
          {viernes === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {viernes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${viernes}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {viernes}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Sábado',
      dataIndex: 'sabado',
      key: 'sabado',
      align: 'center',
      width: 100,
      render: (sabado, record) => (
        <>
          {sabado === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {sabado}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${sabado}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {sabado}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
    {
      title: 'Domingo',
      dataIndex: 'domingo',
      key: 'domingo',
      align: 'center',
      width: 100,
      render: (domingo, record) => (
        <>
          {domingo === 'N/A' ? (
            <Avatar
              size='large'
              style={{background: 'rgba(72,72,127,0.4)'}}
            >
              {domingo}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar el horario del médico ${domingo}?`}
              onConfirm={() => handleDeleteSchedule(record.codHorario)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {domingo}
              </Avatar>
            </Popconfirm>
          )}
        </>
      )
    },
  ];

  useEffect(() => {
    getSchedulesDoctors();
    getDoctorsList();
  }, []);

  useEffect(() => {
    const newSchedules = schedulesInit.map(item => {
      const scheduleFound = dataSchedules.filter(x => x.horaInicio === item.key);
      if (scheduleFound.length >= 1) {
        const newItem = scheduleFound.reduce((prev, current) => {
          return {
            ...item,
            ...prev,
            ...current,
            [current.dia]: current.nombres,
            codHorario: current.codHorario
          }
        }, {});
        return newItem
      } else return item;
    });
    setSchedules(newSchedules);
  }, [dataSchedules]);

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center'>
          <Col xl={8} lg={9} md={24} sm={24} xs={24} className='mb-24'>
            <Card
              title='Asignar Horario'
            >
              <Form
                ref={formRef}
                name='form-schedule-doctor'
                labelCol={{
                  span: 9,
                }}
                wrapperCol={{
                  span: 15,
                }}
                layout="horizontal"
                onFinish={handleCreateSchedule}
                onValuesChange={(e, values) => {
                  if (values.horaInicio) formRef.current.setFieldsValue({
                    ...values,
                    horaFin: moment(values.horaInicio._d).add(2, 'hours')
                  })
                }}
              >
                <Form.Item
                  label="Médico"
                  name='idMedico'
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona un médico'
                    }
                  ]}
                >
                  <Select
                    loading={loadingDoctors}
                    size='large'
                    placeholder='Elegir médico'
                  >
                    {dataDoctors.map(item => (
                      <Select.Option
                        key={item.key}
                        value={item.idMedico}
                      >
                        {item.nombres} {item.apellidoPaterno} {item.apellidoMaterno}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Hora Inicio"
                  name='horaInicio'
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona la hora!'
                    }
                  ]}
                >
                  <TimePicker
                    format='HH'
                    hourStep={2}
                    size='large'
                    style={{width: '100%'}}
                    placeholder='Seleccionar hora'
                  />
                </Form.Item>
                <Form.Item
                  label="Hora Fin"
                  name='horaFin'
                  rules={[
                    {
                      required: true,
                      message: 'Seleciona la hora!'
                    }
                  ]}
                >
                  <TimePicker
                    format='HH'
                    hourStep={2}
                    size='large'
                    style={{width: '100%'}}
                    placeholder='Seleccionar hora'
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label="Día"
                  name='dia'
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona un día!'
                    }
                  ]}
                >
                  <Select placeholder='Selecciona' size='large'>
                    <Select.Option value="lunes">Lunes</Select.Option>
                    <Select.Option value="martes">Martes</Select.Option>
                    <Select.Option value="miercoles">Miércoles</Select.Option>
                    <Select.Option value="jueves">Jueves</Select.Option>
                    <Select.Option value="viernes">Viernes</Select.Option>
                    <Select.Option value="sabado">Sábado</Select.Option>
                    <Select.Option value="domingo">Domingo</Select.Option>
                  </Select>
                </Form.Item>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  loading={loadingCreateSchedule}
                >
                  Agregar
                </Button>
              </Form>
            </Card>
          </Col>
          <Col xl={16} lg={15} md={24} sm={24} xs={24} className='mb-24'>
            <Card
              title='Horarios'
              className='h-full'
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columnsSchedules}
                  size='small'
                  pagination={false}
                  bordered
                  loading={loadingSchedules}
                  dataSource={schedules}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SchedulesPage;