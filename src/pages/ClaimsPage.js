import React, {useRef, useState} from "react";
import {
  Button,
  Col, Form, Input,
  Row
} from "antd";
import lr from "../assets/images/LR.png";
import sorry from "../assets/images/sorry.png";
import {sendMessage} from "../utils/formsData";
import openNotification from "../utils/openNotification";

const ClaimsPage = () => {
  const formRef = useRef();
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);

  const handleSendMessage = async (e) => {
    setLoadingSendMessage(true);
    const { message, success } = await sendMessage({
      ...e,
      nombreApellidoRem: e.nombreRem + ' ' + e.apellidosRem,
      tipo: 'R',
    });
    if (success) {
      formRef.current.resetFields();
      openNotification('Envío de reclamo', message);
    }
    else openNotification('Envío de reclamo', message, 'warning');
    setLoadingSendMessage(false);
  }

  return (
    <>
      <div>
        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:0,marginTop:100}}
          justify='center'
          align='middle'
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:100}}>
              <h2>LIBRO DE RECLAMACIONES</h2>
            </div>
          </Col>
        </Row>
        <Row justify='center' style={{margin:0}}>
          <Col xl={12} lg={11} md={11} sm={20} xs={22} className='mb-24'>
            <img src={lr} alt="imagen de servicios" />
          </Col>
        </Row>
        <Row justify='center' style={{margin:0,marginBottom:100}}>
          <Col xl={12} lg={11} md={11} sm={20} xs={22} className='mb-24'>
            <Form
              name='form-claims-book'
              layout='vertical'
              ref={formRef}
              onFinish={handleSendMessage}
            >
              <Form.Item
                label='Nombre'
                name='nombreRem'
                rules={[
                  {
                    required: true,
                    message: 'Complete este campo!'
                  }
                ]}
              >
                <Input
                  size='large'
                />
              </Form.Item>
              <Form.Item
                label='Apellidos'
                name='apellidosRem'
              >
                <Input
                  size='large'
                />
              </Form.Item>
              <Form.Item
                label='Celular'
                name='celularRem'
                rules={[
                  {
                    len: 9,
                    message: 'Ingrese un número de celular valido!'
                  }
                ]}
              >
                <Input
                  prefix='+51'
                  size='small'
                  type='number'
                />
              </Form.Item>
              <Form.Item
                label='Correo'
                name='correoRem'
                rules={[
                  {
                    required: true,
                    message: 'Complete este campo!'
                  },
                  {
                    type: 'email',
                    message: 'Ingrese un correo valido!'
                  }
                ]}
              >
                <Input
                  size='large'
                />
              </Form.Item>
              <Form.Item
                label='Reclamación'
                name='contenido'
                rules={[
                  {
                    required: true,
                    message: 'Complete este campo!'
                  },
                  {
                    max: 300,
                    message: 'Superó el límite de caractéres!'
                  }
                ]}
              >
                <Input.TextArea
                  showCount
                  size='large'
                  maxLength={300}
                  rows={5}
                  // autoSize={true}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType='submit'
                  block
                  shape="round"
                  type='primary'
                  className='warning'
                  style={{marginTop:30}}
                  loading={loadingSendMessage}
                >
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify='center' style={{margin:0,marginBottom:100}} align='middle'>
          <Col xl={10} lg={10} md={11} sm={20} xs={22} className='mb-24'>
            <Row style={{background: 'rgba(72, 72, 127, 0.2)', padding:20, borderRadius:15}}>
              <Col span={14}>
                <img src={sorry} alt="sorry" />
              </Col>
              <Col span={10} className="text-center fw-bold">
                Lamentamos haber causado incovenientes. Mejoraremos para el futuro.
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClaimsPage;