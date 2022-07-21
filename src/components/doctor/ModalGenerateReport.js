import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {MyContext} from "../../context/AuthContext";
import {generateReportToPatient} from "../../utils/formsData";
import openNotification from "../../utils/openNotification";
import {apiPath, axiosInstance} from "../../utils/api";

const ModalGenerateReport = ({
                                visible,
                                setVisible,
                                getReports,
                          }) => {
  const formRef = useRef();
  const { authDoctor } = useContext(MyContext);
  const [loadingGenerateMyReport ,setLoadingGenerateMyReport] = useState(false);
  const [dataPatients, setDataPatients] = useState([]);
  const [loadingDataPatients, setLoadingDataPatients] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getPatientsList = () => {
    setLoadingDataPatients(true);
    axiosInstance
      .get(apiPath.admin.getPatients)
      .then(({ data }) => {
        if (data.success) setDataPatients(data.data);
        else openNotification('Médicos', data.message, 'warning');
        setLoadingDataPatients(false);
      })
      .catch(e => openNotification(
        'Médicos',
        'Error en la petición de lista doctores',
        'error'));
  }

  const searchReport = async (numOrder) => {
    try {
      const { data: { success, data, message } } = await axiosInstance.get(`${apiPath.date.searchDate}/${numOrder}`);
      if (success) {
        return data.idCita;
      } else openNotification('Búsqueda de cita', message, 'warning');
    } catch (e) {
      console.error(e);
    }
  }

  const handleGenerateReport = async (e) => {
    setLoadingGenerateMyReport(true);
    const dataFormat = {
      ...e,
      archivo: e.archivo[0].originFileObj,
      medico: authDoctor.idMedico,
    }

    const cita = await searchReport(Number(dataFormat.numOrden));
    if (!cita) {
      setLoadingGenerateMyReport(false);
      return;
    }
    dataFormat.cita = cita;
    const { message, success } = await generateReportToPatient(dataFormat);
    if (success) {
      openNotification('Informe', message);
      setVisible(false);
      getReports();
      formRef.current.resetFields();
    } else openNotification('Informe', message, 'warning');
    setLoadingGenerateMyReport(false);
  }

  useEffect(() => {
    getPatientsList();
  }, [])

  return (
    <Modal
      title='Generar informe'
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          htmlType='submit'
          form='form-generate-report'
          loading={loadingGenerateMyReport}
        >
          Generar
        </Button>
      ]}
    >
      <Form
        id='form-generate-report'
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
        onFinish={handleGenerateReport}
        ref={formRef}
        style={{margin:0}}
      >
        <Row justify='space-between'>
          <Col xl={22} lg={22} md={22} sm={22} xs={22}>
            <Form.Item
              label="Paciente"
              name='paciente'
              rules={[
                {
                  required: true,
                  message: 'Seleccione un paciente!'
                }
              ]}
            >
              <Select
                loading={loadingDataPatients}
                size='large'
              >
                {dataPatients.map(item => (
                  <Select.Option
                    key={item.key}
                    value={item.idPaciente}
                  >
                    {item.nombres} {item.apellidoPaterno} {item.apellidoMaterno}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Resumen"
              name='resumen'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Número de orden"
              name='numOrden'
              rules={[
                {
                  required: true,
                  message: 'Completa este campo!'
                }
              ]}
            >
              <Input type='number' />
            </Form.Item>
            <Form.Item
              label="Archivo"
            >
              <Form.Item
                name="archivo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Adjunte un archivo .pdf!'
                  }
                ]}
              >
                <Upload.Dragger
                  name='file'
                  method='get'
                  multiple={false}
                  maxCount={1}
                  beforeUpload={file => {
                    const isPdf = file.type === 'application/pdf';
                    if (!isPdf) openNotification('Archivo', 'El archivo tiene que ser de tipo pdf', 'warning');
                    return isPdf || Upload.LIST_IGNORE;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Clic aquí o arrastra tu archivo .pdf</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalGenerateReport;