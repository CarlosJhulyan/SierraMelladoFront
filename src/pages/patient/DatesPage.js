import React, {useContext, useEffect, useState} from "react";
import {
  Button,
  Calendar,
  Card,
  Col, Divider, Form, Input,
  Row, Select, TimePicker, Typography, Upload
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {MyContext} from "../../context/AuthContext";
import {InboxOutlined} from "@ant-design/icons";

const formatCalendar = {
  "lang": {
    "locale": "es_US",
    "placeholder": "Seleccinar fecha",
    "rangePlaceholder": ["Fecha inicio", "Fecha fin"],
    "today": "Hoy",
    "now": "Ahora",
    "backToToday": "Regresar a hoy",
    "ok": "Aceptar",
    "clear": "Limpiar",
    "month": "Mes",
    "year": "Año",
    "dateSelect": "Select date",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthFormat": "MMMM",
    "monthBeforeYear": true,
    "previousMonth": "Previous month (PageUp)",
    "nextMonth": "Next month (PageDown)",
    "previousYear": "Last year (Control + left)",
    "nextYear": "Next year (Control + right)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
  },
  "timePickerLocale": {
    "placeholder": "Select time"
  },
  "dateFormat": "YYYY-MM-DD",
  "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
  "weekFormat": "YYYY-wo",
  "monthFormat": "YYYY-MM"
}

const DatesPage = () => {
  const { authPatient } = useContext(MyContext);
  const [dataDoctors, setDataDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const onPanelChange = (value) => {
    console.log(value.format('YYYY-MM-DD'));
  };

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

  const getServicesList = () => {
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getPaymentMethodsList = () => {
    setLoadingPayment(true);
    axiosInstance
      .get(apiPath.paymentMethod.get)
      .then(({ data }) => {
        if (data.success) setPaymentMethods(data.data.map(item => {
          return {
            ...item,
            key: item.codMetodo
          }
        }));
        else openNotification('Métodos de pago', data.message, 'warning');
        setLoadingPayment(false);
      })
      .catch(e => openNotification(
        'Métodos de pago',
        'Error en la petición',
        'error'
      ));
  }

  const handleSelectDoctor = (id) => {
    console.log(id)
  }

  const handleSaveDate = async values => {
    const importeTotal = parseFloat(services.find(item => item.idServicio === values.servicio).precio);
    const montoTotal = parseFloat(values.montoTotal);
    const dataFormat = {
      ...values,
      hora: moment(values.hora).format('H'),
      fecha: moment(values.fecha).format('YYYY-MM-DD'),
      paciente: authPatient.idPaciente,
      estado: 'P',
      montoTotal,
      vuelto: montoTotal - importeTotal,
      importeTotal,
    }
    console.log(dataFormat)
  }

  useEffect(() => {
    getDoctorsList();
    getServicesList();
    getPaymentMethodsList();
  }, [])

  return (
    <>
      <div className="layout-content">
        <Row
          gutter={[24,0]}
          justify='center'
        >
          <Col
            span={24}
            className='mb-24'
          >
            <Card
              title='Reservar una cita'
            >
              <Form
                name='form-cita'
                layout='vertical'
                onFinish={handleSaveDate}
              >
                <Row gutter={[24,0]} justify='space-between'>
                  <Col span={24}>
                    <h6>Datos para la atención</h6>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Servicio'
                      name='servicio'
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione el servicio!'
                        }
                      ]}
                    >
                      <Select
                        size='large'
                        placeholder='Selecciona'
                        loading={loadingServices}
                      >
                        {services.map(item => (
                          <Select.Option
                            key={item.key}
                            value={item.idServicio}
                          >
                            {item.descripcion} - S/. {item.precio}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Médico'
                      name='medico'
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione el médico!'
                        }
                      ]}
                    >
                      <Select
                        placeholder='Selecciona'
                        loading={loadingDoctors}
                        size='large'
                        onSelect={handleSelectDoctor}
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
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Descripción'
                      name='descripcion'
                      rules={[
                        {
                          required: true,
                          message: 'Descripción del caso necesario!'
                        }
                      ]}
                    >
                      <Input.TextArea
                        rows={5}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={[24,0]} justify='space-between'>
                  <Col span={24}>
                    <h6>Horario de atención</h6>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Hora"
                      name='hora'
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione una hora!'
                        }
                      ]}
                    >
                      <TimePicker
                        size='large'
                        style={{width: '100%'}}
                        placeholder='Seleccionar hora'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Fecha'
                      name='fecha'
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione la fecha!'
                        }
                      ]}
                    >
                      <Calendar
                        className='mb-24'
                        fullscreen={false}
                        onChange={onPanelChange}
                        locale={formatCalendar}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider/>
                <Row gutter={[24,0]} justify='space-between'>
                  <Col span={24}>
                    <h6>Datos de pago</h6>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Método de pago'
                      name='codMetodo'
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione su método de pago!'
                        }
                      ]}
                    >
                      <Select
                        size='large'
                        placeholder='Selecciona'
                        loading={loadingPayment}
                      >
                        {paymentMethods.map(item => (
                          <Select.Option
                            key={item.key}
                            value={item.codMetodo}
                          >
                            {item.descripcion}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label='Monto'
                      name='montoTotal'
                      rules={[
                        {
                          required: true,
                          message: 'Ingrese el monto de su comprobante!'
                        }
                      ]}
                    >
                      <Input
                        min={0}
                        prefix='S/.'
                        type='number'
                        size='small'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Adjuntar comprobante"
                    >
                      <Form.Item
                        name="archivo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: 'Adjunte su comprobante!'
                          }
                        ]}
                      >
                        <Upload.Dragger
                          name='file'
                          method='get'
                          multiple={false}
                          maxCount={1}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Clic aquí o arrastra tu imagen</p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={[24,0]} justify='space-between'>
                  <Col span={11}>
                    <Button
                      block
                      htmlType='reset'
                    >
                      Limpiar
                    </Button>
                  </Col>
                  <Col span={11}>
                    <Button
                      type='primary'
                      block
                      htmlType='submit'
                    >
                      Pagar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DatesPage;