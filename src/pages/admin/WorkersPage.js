import React, {
  useEffect,
  useState
} from "react";
import {
  Avatar, Button,
  Card,
  Col, Modal,
  Row,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {apiPath, axiosInstance} from "../../utils/api";
import {baseUrlImage} from "../../config/backend";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import ModalUpsertDoctor from "../../components/admin/ModalUpsertDoctor";
import {changeStatusAdmin, deleteAdmin, deleteDoctor} from "../../utils/formsData";
import ModalUpsertAdmin from "../../components/admin/ModalUpsertAdmin";

const WorkersPage = () => {
  const { Title, Text } = Typography;
  const { confirm } = Modal;
  const [currentDoctor, setCurrentDoctor] = useState();
  const [currentAdmin, setCurrentAdmin] = useState();
  const [dataDoctors, setDataDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [dataAdmins, setDataAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [visibleModalUpsertDoctor, setVisibleModalUpsertDoctor] = useState(false);
  const [visibleModalUpsertAdmin, setVisibleModalUpsertAdmin] = useState(false);

  const handleSelectDoctor = (record) => {
    setCurrentDoctor(record);
    setVisibleModalUpsertDoctor(true);
  }

  const handleSelectAdmin = (record) => {
    setCurrentAdmin(record);
    setVisibleModalUpsertAdmin(true);
  }

  const handleChangeStatusAdmin = async (idAdmin) => {
    confirm({
      content: `¿Esta seguro de cambiar el estado del personal?`,
      centered: true,
      onOk: async () => {
        setLoadingAdmins(true);
        const { success, message } = await changeStatusAdmin({
          idAdmin
        });
        if (success) {
          openNotification('Personal', message);
          getAdminsList();
        } else openNotification('Personal', message, 'warning');
      },
      okText: 'Cambiar',
      cancelText: 'Cancelar',
    });
  }

  const handleDeleteDoctor = async (record) => {
    confirm({
      content: `¿Esta seguro de eliminar al médico ${record.nombres}?`,
      centered: true,
      onOk: async () => {
        setLoadingDoctors(true);
        const { success, message } = await deleteDoctor(record.idMedico);
        if (success) {
          openNotification('Médico', message);
          getDoctorsList();
        } else openNotification('Médico', message, 'warning');
      },
      okText: 'Si',
      cancelText: 'No',
    });
  }

  const handleDeleteAdmin = async (record) => {
    confirm({
      content: `¿Esta seguro de eliminar al personal ${record.nombres}?`,
      centered: true,
      onOk: async () => {
        setLoadingAdmins(true);
        const { success, message } = await deleteAdmin(record.idAdmin);
        if (success) {
          openNotification('Personal', message);
          getAdminsList();
        } else openNotification('Personal', message, 'warning');
      },
      okText: 'Si',
      cancelText: 'No',
    });
  }

  const doctorColumns = [
    {
      title: "NOMBRE COMPLETO",
      dataIndex: "nombres",
      key: "nombres",
      width: "32%",
      render: (text, current) => (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={baseUrlImage + current.avatar}
              style={{background: '#48487F'}}
            >
              {!current.avatar && (
                <>
                  {text[0]}{current.apellidoPaterno[0]}
                </>
              )}
            </Avatar>
            <div className="avatar-info">
              <Title level={5}>{current.nombres} {current.apellidoPaterno} {current.apellidoMaterno}</Title>
            </div>
          </Avatar.Group>{" "}
        </>
      )
    },
    {
      title: "ESPECIALIDAD",
      dataIndex: "especialidades",
      key: "especialidades",
      render: (especialidades = []) => (
        <div>
          {
            especialidades.map(item => (
              <Tag color="volcano">{item.descripcion}</Tag>
            ))
          }
        </div>
      )
    },
    {
      title: "CELULAR",
      key: "celular",
      dataIndex: "celular",
    },
    {
      title: "CORREO",
      key: "correo",
      dataIndex: "correo",
    },
    {
      title: "ACCIONES",
      key: "key",
      dataIndex: "key",
      render: (key, record) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => handleSelectDoctor(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Text>
            <Text
              onClick={() => handleDeleteDoctor(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Text>
            <Text
              onClick={() => handleSelectDoctor(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const adminColumns = [
    {
      title: "NOMBRE COMPLETO",
      dataIndex: "nombres",
      key: "nombres",
      width: "32%",
      render: (text = '', current) => (
        <>
          <Avatar.Group>
            <Avatar
              style={{background: '#000'}}
              className="shape-avatar"
              shape="square"
              size={40}
            >{text[0]}{current.apellidoPaterno[0]}</Avatar>
            <div className="avatar-info">
              <Title level={5}>{current.nombres} {current.apellidoPaterno} {current.apellidoMaterno}</Title>
            </div>
          </Avatar.Group>{" "}
        </>
      )
    },
    {
      title: "CREADO",
      dataIndex: "fechaCrea",
      key: "fechaCrea",
      render: (fechaCrea) => (
        <>{moment(fechaCrea).format('DD/MM/YYYY, h:mm:ss a')}</>
      )
    },
    {
      title: "CORREO",
      key: "correo",
      dataIndex: "correo",
    },
    {
      title: "ROL",
      key: "rol",
      dataIndex: "rol",
      render: (rol) => (
        <>
          {rol.trim() === 'editor' && <Tag color="magenta">EDITOR</Tag>}
          {rol.trim() === 'admin' && <Tag color="lime">ADMINISTRADOR</Tag>}
          {rol.trim() === 'lector' && <Tag color="cyan">LECTOR</Tag>}
        </>
      )
    },
    {
      title: "ESTADO",
      key: "estado",
      dataIndex: "estado",
      render: (estado, record) => (
        <Switch
          checkedChildren="Activo"
          unCheckedChildren="No activo"
          checked={estado === 1}
          onClick={() => handleChangeStatusAdmin(record.idAdmin)}
        />
      )
    },
    {
      title: "ACCIONES",
      key: "key",
      dataIndex: "key",
      render: (key, record) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => handleSelectAdmin(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Text>
            <Text
              onClick={() => handleDeleteAdmin(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Text>
            <Text
              onClick={() => handleSelectAdmin(record)}
              style={{cursor:'pointer'}}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const getDoctorsList = () => {
    setLoadingDoctors(true);
    axiosInstance
      .get(apiPath.admin.getMedicos)
      .then(({ data }) => {
        if (data.success) setDataDoctors(data.data);
        else openNotification('Trabajadores', data.message, 'warning');
        setLoadingDoctors(false);
      })
      .catch(e => openNotification(
        'Trabajadores',
        'Error en la petición de lista doctores',
        'error'));
  }

  const getAdminsList = () => {
    setLoadingAdmins(true);
    axiosInstance
      .get(apiPath.admin.getAdmins)
      .then(({data}) => {
        if (data.success) setDataAdmins(data.data);
        else openNotification('Trabajadores', data.message, 'warning');
        setLoadingAdmins(false);
      })
      .catch(e => openNotification(
        'Trabajadores',
        'Error en la petición de lista personal',
        'error'));
  }

  useEffect(() => {
    getDoctorsList();
    getAdminsList();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col span={24} className="mb-24">
            <Card
              bordered={false}
              className="h-full"
              title='Médicos'
              extra={
                <>
                  <Button onClick={() => {
                    setCurrentDoctor();
                    setVisibleModalUpsertDoctor(true);
                  }}>
                    Crear médico
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={doctorColumns}
                  dataSource={dataDoctors}
                  size='small'
                  pagination={{
                    pageSize: 5
                  }}
                  loading={loadingDoctors}
                />
              </div>
            </Card>
          </Col>
          <Col span={24} className="mb-24">
            <Card
              bordered={false}
              className="h-full"
              title='Personal Administrativo'
              extra={
                <>
                  <Button onClick={() => {
                    setCurrentAdmin();
                    setVisibleModalUpsertAdmin(true);
                  }}>
                    Crear personal
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={adminColumns}
                  dataSource={dataAdmins}
                  size='small'
                  pagination={{
                    pageSize: 5
                  }}
                  loading={loadingAdmins}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <ModalUpsertDoctor
        currentDoctor={currentDoctor}
        visible={visibleModalUpsertDoctor}
        setVisible={setVisibleModalUpsertDoctor}
        getDoctorsList={getDoctorsList}
      />

      <ModalUpsertAdmin
        setVisible={setVisibleModalUpsertAdmin}
        visible={visibleModalUpsertAdmin}
        getAdminsList={getAdminsList}
        currentAdmin={currentAdmin}
      />
    </>
  )
}

export default WorkersPage;