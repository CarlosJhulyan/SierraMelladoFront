import React, {useEffect, useRef, useState} from "react";

import {
  Button,
  Carousel,
  Col,
  Form, Image,
  Input, Modal,
  Row, Typography,
} from "antd";

import slide1 from '../assets/images/slider1.png';
import slide2 from '../assets/images/slider2.png';
import slide3 from '../assets/images/slider3.png';
import contact from '../assets/images/contact-home.png';
import services from '../assets/images/services.png';
import {apiPath, axiosInstance} from "../utils/api";
import openNotification from "../utils/openNotification";
import {baseUrlImage} from "../config/backend";
import {Link} from "react-router-dom";
import {
  sendMessage
} from '../utils/formsData';
import moment from "moment";

function HomePage() {
  const { Title, Text, Paragraph } = Typography;
  const formRef = useRef();
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState({});
  const [visibleModalArticle, setVisibleModalArticle] = useState(false);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);

  const getRecentArticles = () => {
    axiosInstance
      .get(apiPath.article.getRecentHome)
      .then(({ data }) => {
        if (data.success) setArticles(data.data);
        else console.log(data.message);
      })
      .catch(e => console.log('Error en la petición'))
  }

  const handleSendMessage = async (e) => {
    setLoadingSendMessage(true);
    const { message, success } = await sendMessage({
      ...e,
      tipo: 'C',
    });
    if (success) {
      formRef.current.resetFields();
      openNotification('Envío de mensaje', message);
    }
    else openNotification('Envío de mensaje', message, 'warning');
    setLoadingSendMessage(false);
  }

  useEffect(() => {
    getRecentArticles();
  }, [])

  return (
    <>
      <div>
        <Carousel
          autoplay
          style={{marginBottom:100}}
        >
          <img key='1' src={slide1} alt="Slider1" width='100%' />
          <img key='2' src={slide2} alt="Slider2" width='100%' />
          <img key='3' src={slide3} alt="Slider3" width='100%' />
        </Carousel>

        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:100}}
          justify='center'
          align='middle'
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:100}}>
              <h2>ACCEDE A NUESTROS SERVICIOS</h2>
            </div>
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22} className='mb-24'>
            <img src={services} alt="imagen de servicios" />
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22}>
            {/*<p style={{textAlign:'center'}}>*/}
            {/*  Accede a nuestros servicios para reservar citas y cirugías. Tambien podrás hacer seguimiento de tus consultas en tiempo real.*/}
            {/*</p>*/}
            <Button
              block
              type='primary'
              style={{
                marginBottom:20,
                fontSize: 20
              }}
              className='warning'
              size='large'
            >
              <Link to='/paciente/registro'>Registrarme</Link>
            </Button>
            <Button
              block
              type='primary'
              style={{
                fontSize: 20
              }}
              size='large'
              className='warning'
            >
              <Link to='/paciente/ingreso'>Ingresar</Link>
            </Button>
          </Col>
        </Row>

        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:100}}
          justify='center'
          align='middle'
        >
          <Col xl={9} lg={10} md={11} sm={20} xs={22}>
            <Form
              ref={formRef}
              name='form-contact-home'
              layout='vertical'
              onFinish={handleSendMessage}
            >
              <Form.Item
                name='nombreApellidoRem'
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
          <Col xl={9} lg={10} md={11} sm={20} xs={22} className='mb-24'>
            <img src={contact} alt="" />
            <div className="text-center">
              <h5>
                Ponte en contacto con nosotros
              </h5>
              <p>
                Lunes-Viernes 9a.m. - 9p.m.
              </p>
            </div>
          </Col>
        </Row>

        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:100}}
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:100}}>
              <h2>APRENDE UN POCO MÁS</h2>
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[24,0]} justify='space-around'>
              {articles.map(article => (
                <div key={article.codArticulo} className="card tarjeta" style={{width: '18rem'}}>
                  <div className="imgTarjeta">
                    <img src={baseUrlImage + article.imagen} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body text-center">
                    <h5>
                      {article.titulo}
                    </h5>
                    <p style={{textAlign:'justify'}}>
                      {article.contenido.substring(0,100)}...
                    </p>
                    <Button
                      type='primary'
                      className='warning'
                      onClick={() => {
                        setVisibleModalArticle(true);
                        setCurrentArticle(article);
                      }}
                    >
                      Leer más...
                    </Button>
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {visibleModalArticle && (
        <Modal
          title={currentArticle.titulo.toUpperCase()}
          visible={visibleModalArticle}
          onCancel={() => setVisibleModalArticle(false)}
          footer={false}
        >
          <Image src={baseUrlImage + currentArticle.imagen} />
          <Paragraph style={{textAlign: 'justify'}}>{currentArticle.contenido}</Paragraph>
          <Paragraph style={{textAlign: 'left'}}>Autor: {currentArticle.autor}</Paragraph>
          <Paragraph style={{textAlign: 'right'}}>Fecha publ. {moment(currentArticle.fechaCrea).format('lll')}</Paragraph>
        </Modal>
      )}
    </>
  );
}

export default HomePage;
