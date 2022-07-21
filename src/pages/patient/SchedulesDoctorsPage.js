import React, {useState, useEffect} from "react";
import {
  Avatar,
  Card,
  Col, Image, Popover,
  Row,
  Table,
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {schedulesInit} from "../../config/schedules";
import {baseUrlImage} from "../../config/backend";

const SchedulesDoctorsPage = () => {
  const [schedules, setSchedules] = useState(schedulesInit);
  const [dataSchedules, setDataSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {lunes}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {martes}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {miercoles}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {jueves}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {viernes}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {sabado}
              </Avatar>
            </Popover>
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
            <Popover content={(
              <>
                <Avatar size='large' src={record.avatar && baseUrlImage + record.avatar} style={{background: '#000'}}>
                  {!record.avatar && 'Sin'}
                </Avatar>
                {" "}
                <small>{record.nombreCompleto}</small>
              </>
            )} title="Detalles de Médico">
              <Avatar
                size='large'
                style={{background: '#34b7a7',cursor:'pointer'}}
              >
                {domingo}
              </Avatar>
            </Popover>
          )}
        </>
      )
    },
  ];

  useEffect(() => {
    getSchedulesDoctors();
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
        <Row
          gutter={[24,0]}
          justify='center'
        >
          <Col
            xl={20} lg={20} md={20} sm={24} xs={24}
            className='mb-24'
          >
            <Card
              title='Horarios de médicos'
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

export default SchedulesDoctorsPage;