import React, {useContext, useEffect, useRef, useState} from "react";
import {
  AutoComplete, Avatar, Button,
  Card,
  Col, Form, Popconfirm,
  Row, Select, Table, TimePicker
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {MyContext} from "../../context/AuthContext";
import {createScheduleDoctor, deleteSchedule} from "../../utils/formsData";
import moment from "moment";

const schedulesInit = [
  {
    key: 0,
    hora: '00:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 2,
    hora: '02:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 4,
    hora: '04:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 6,
    hora: '06:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 8,
    hora: '08:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 10,
    hora: '10:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 12,
    hora: '12:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 14,
    hora: '14:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 16,
    hora: '16:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 18,
    hora: '18:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 20,
    hora: '20:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 22,
    hora: '22:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
  {
    key: 24,
    hora: '24:00',
    lunes: 'N/A',
    martes: 'N/A',
    miercoles: 'N/A',
    jueves: 'N/A',
    viernes: 'N/A',
    sabado: 'N/A',
    domingo: 'N/A',
  },
];

const SchedulesPage = () => {
  const formRef = useRef();
  const { authDoctor } = useContext(MyContext);
  const [dataSchedules, setDataSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [loadingCreateSchedule, setLoadingCreateSchedule] = useState(false);

  const handleCreateSchedule = async (e) => {
    setLoadingCreateSchedule(true);
    const { message, success } = await createScheduleDoctor({
      ...e,
      horaInicio: moment(e.horaInicio).format('H'),
      horaFin: moment(e.horaFin).format('H'),
      idMedico: authDoctor.idMedico
    });
    if (success) {
      openNotification('Horario', message);
      getMySchedules();
      formRef.current.resetFields();
    } else openNotification('Horario', message, 'warning');
    setLoadingCreateSchedule(false);
  }

  const [schedules, setSchedules] = useState(schedulesInit);

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
              style={{background: '#48487F'}}
            >
              {lunes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {martes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {miercoles}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {jueves}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {viernes}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {sabado}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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
              style={{background: '#48487F'}}
            >
              {domingo}
            </Avatar>
          ) : (
            <Popconfirm
              title={`¿Está seguro de eliminar su horario?`}
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

  const handleDeleteSchedule = async (id) => {
    const { success, message } = await deleteSchedule(id);
    if (success) {
      getMySchedules();
      openNotification('Horario', message);
    } else openNotification('Horario', message, 'warning');
  }

  const getMySchedules = () => {
    setLoadingSchedules(true);
    axiosInstance
      .get(`${apiPath.schedule.getDoctors}`)
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

  useEffect(() => {
    getMySchedules();
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
  }, [dataSchedules])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]}>
          <Col xl={8} lg={9} md={24} sm={24} xs={24} className='mb-24'>
            <Card title='Elegir horario'>
              <Form
                ref={formRef}
                id='form-schedule-doctor'
                labelCol={{
                  span: 9,
                }}
                wrapperCol={{
                  span: 15,
                }}
                layout="horizontal"
                onFinish={handleCreateSchedule}
              >
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
              title='Mis horarios'
              className='h-full'
            >
              <div className="table-responsive">
                <Table
                  columns={columnsSchedules}
                  size='small'
                  pagination={false}
                  bordered
                  dataSource={schedules}
                  loading={loadingSchedules}
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