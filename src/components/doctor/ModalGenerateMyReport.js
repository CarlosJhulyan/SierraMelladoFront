import React, {useContext, useEffect, useRef, useState} from "react";
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
import {generateReportToDoctor} from "../../utils/formsData";
import openNotification from "../../utils/openNotification";

const ModalGenerateMyReport = ({
                                visible,
                                setVisible,
                                getMyReports,
                          }) => {
  const formRef = useRef();
  const { authDoctor } = useContext(MyContext);
  const [loadingGenerateMyReport ,setLoadingGenerateMyReport] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleGenerateReport = async (e) => {
    setLoadingGenerateMyReport(true);
    const dataFormat = {
      ...e,
      archivo: e.archivo[0].originFileObj,
      idMedico: authDoctor.idMedico
    }
    const { message, success } = await generateReportToDoctor(dataFormat);
    if (success) {
      openNotification('Informe', message);
      setVisible(false);
      getMyReports();
      formRef.current.resetFields();
    } else openNotification('Informe', message, 'warning');
    setLoadingGenerateMyReport(false);
  }

  return (
    <Modal
      title='Generar informe'
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          htmlType='submit'
          form='form-generate-my-report'
          loading={loadingGenerateMyReport}
        >
          Generar
        </Button>
      ]}
    >
      <Form
        id='form-generate-my-report'
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
              label="Asunto"
              name='asunto'
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

export default ModalGenerateMyReport;