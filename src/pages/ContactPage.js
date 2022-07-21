import React, {useRef, useState} from "react";
import {
  Button,
  Col, Form, Input,
  Row,
} from "antd";
import welcomeContact from '../assets/images/contactenos-bienvenida.jpg';
import scheduleContact from '../assets/images/contactenos-horario.webp';
import mapContact from '../assets/images/contactenos-mapa.PNG';
import messageContact from '../assets/images/contactenos-mensaje.png';
import doctorContact from '../assets/images/contactenos-doctor.webp';
import {sendMessage} from "../utils/formsData";
import openNotification from "../utils/openNotification";

const ContactPage = () => {
  const formRef = useRef();
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);

  const handleSendMessage = async (e) => {
    setLoadingSendMessage(true);
    const { message, success } = await sendMessage({
      ...e,
      nombreApellidoRem: e.nombreRem + ' ' + e.apellidosRem,
      tipo: 'C',
    });
    if (success) {
      formRef.current.resetFields();
      openNotification('Envío de mensaje', message);
    }
    else openNotification('Envío de mensaje', message, 'warning');
    setLoadingSendMessage(false);
  }

  const cards = [
    {
      key: 1,
      image: doctorContact,
      titulo: 'TELÉFONO DE CONTACTO',
      descripcion: (
        <span>
          +51 949 346 520 <br/>
          Dr Victor Sierra Barrientos.
        </span>
      ),
    },
    {
      key: 2,
      image: mapContact,
      titulo: 'DIRECCIÓN',
      descripcion: (
        <span>
          Jirón Libertad 799 (cercado)<br/>
          Ayacucho, Perú
        </span>
      ),
    },
    {
      key: 3,
      image: scheduleContact,
      titulo: 'HORARIOS',
      descripcion: (
        <span>
          Lunes a viernes:<br/>
          9:00 a.m. - 21:00 p.m.
        </span>
      ),
    },
  ];

  return (
    <>
      <div>
        <img src={welcomeContact} className="d-block w-100" alt="..." />
        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:100}}
          justify='center'
          align='middle'
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:50,marginTop:50}}>
              <h2>CONTACTA CON NOSOTROS</h2>
            </div>
            <div className="Btexto text-center">
              <p style={{fontSize:20}}>
                Amamos las preguntas y el feedback de nuestros clientes.<br/>
                Siempre estamos felices de ayudar.<br/>
              </p>
              <p style={{fontSize:20}}>
                Algunas formas de contactarnos:
              </p>
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[24,0]} justify='space-around'>
              {cards.map(card => (
                <div key={card.key} className="card tarjeta" style={{width: '18rem'}}>
                  <div className="imgTarjeta">
                    <img src={card.image} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body text-center">
                    <h5>
                      {card.titulo}
                    </h5>
                    <p style={{textAlign:'justify', fontSize:16}} className='text-center'>
                      {card.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
        <Row
          gutter={[24, 0]}
          justify='center'
          style={{width:'100%',margin:0,marginBottom:100}}
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:100}}>
              <h2>ENVIANOS TU MENSAJE</h2>
            </div>
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22} className='mb-24'>
            <img src={messageContact} alt="" />
            <div className="text-center">
              <h5 style={{fontSize:25}}>
                Llena el formulario y nuestro equipo reponderá a la brevedad
              </h5>
            </div>
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22}>
            <Form
              ref={formRef}
              name='form-contact'
              layout='vertical'
              onFinish={handleSendMessage}
            >
              <Form.Item
                name='nombreRem'
                rules={[
                  {
                    required: true,
                    message: 'Complete este campo!'
                  }
                ]}
              >
                <Input
                  placeholder='Nombre'
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='apellidosRem'
              >
                <Input
                  placeholder='Apellidos'
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='celularRem'
                rules={[
                  {
                    len: 9,
                    message: 'Ingrese un número de celular valido!'
                  }
                ]}
              >
                <Input
                  placeholder='Celular'
                  prefix='+51'
                  size='small'
                  type='number'
                />
              </Form.Item>
              <Form.Item
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
                  placeholder='Correo'
                  size='large'
                />
              </Form.Item>
              <Form.Item
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
                  placeholder='Mensaje'
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
      </div>
    </>
  );
}
export default ContactPage;