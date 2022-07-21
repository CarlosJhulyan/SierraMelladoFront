import React, {useEffect, useRef, useState} from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input, Modal,
  Row,
  Table, Typography
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {createService} from "../../utils/formsData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const ServicesPage = () => {
  const formRef = useRef();
  const { confirm } = Modal;
  const { Text } = Typography;
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const columns = [
    {
      title: 'DESCRIPCION',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'ABREVIATURA',
      dataIndex: 'abreviatura',
      key: 'abreviatura',
    },
    {
      title: 'PRECIO',
      dataIndex: 'precio',
      key: 'precio',
      render: (precio) => <span>S/. {Number(precio).toFixed(2)}</span>
    },
    {
      title: 'ACCIONES',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (key) => (
        <>
          <div className="ant-employed">
            <Text
              onClick={() => {
                confirm({
                  content: '¿Esta seguro de eliminar este servicio?',
                  onOk: () => {
                    handleDeleteService(key);
                  },
                  okText: 'Si!',
                  cancelText: 'No!'
                });
              }}
              style={{cursor:'pointer', margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const handleCreateService = async values => {
    setLoadingSave(true);
    const { success, message } = await createService(values);
    if (success) {
      openNotification('Servicio', message);
      getServices();
      formRef.current.resetFields();
    } else openNotification('Servicio', message, 'warning');
    setLoadingSave(false);
  }

  const handleDeleteService = (idServicio) => {
    axiosInstance
      .delete(`${apiPath.service.delete}/${idServicio}`)
      .then(({ data }) => {
        if (data.success) {
          openNotification('Servicio', data.message);
          getServices();
        } else openNotification('Servicio', data.message, 'warning');
      })
      .catch(e => openNotification(
        'Servicio',
        'Error en la petición',
        'error'
      ));
  }

  const getServices = () => {
    setLoadingServices(true);
    axiosInstance
      .get(apiPath.service.get)
      .then(({ data }) => {
        if (data.success) setServices(data.data.map(item => {
          return {
            ...item,
            key: item.idServicio
          }
        }));
        else openNotification('Servicios', data.message, 'warning');
        setLoadingServices(false);
      })
      .catch(e => openNotification(
        'Servicios',
        'Error en la petición',
        'error'
      ));
  }

  useEffect(() => {
    getServices();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]}>
          <Col xl={8} lg={9} md={10} sm={24} xs={24}>
            <Card
              className='mb-24'
              title='Crear Servicio'
            >
              <Form
                name='form-service'
                labelCol={{
                  span: 8
                }}
                wrapperCol={{
                  span: 16
                }}
                ref={formRef}
                onFinish={handleCreateService}
              >
                <Form.Item
                  name='descripcion'
                  label='Descripción'
                  rules={[
                    {
                      required: true,
                      message: 'Complete este campo!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='abreviatura'
                  label='Abreviatura'
                  rules={[
                    {
                      required: true,
                      message: 'Complete este campo!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='precio'
                  label='Precio'
                  rules={[
                    {
                      required: true,
                      message: 'Agregue su precio de servicio!'
                    },
                  ]}
                >
                  <Input
                    min={0}
                    type='number'
                  />
                </Form.Item>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  loading={loadingSave}
                >
                  Agregar
                </Button>
              </Form>
            </Card>
          </Col>
          <Col xl={16} lg={15} md={14} sm={24} xs={24}>
            <Card
              className='mb-24'
              title='Servicios'
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  pagination={{
                    pageSize: 10
                  }}
                  size='small'
                  dataSource={services}
                  loading={loadingServices}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ServicesPage;