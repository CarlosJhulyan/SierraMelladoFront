import React, {useRef, useState} from "react";
import {
  Button,
  Col, Form, Input, Modal,
  Row
} from "antd";
import lr from "../assets/images/LR.png";
import sorry from "../assets/images/sorry.png";
import {sendMessage} from "../utils/formsData";
import openNotification from "../utils/openNotification";

const ClaimsPage = () => {
  const formRef = useRef();
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
                  placeholder='Reclamación'
                  showCount
                  size='large'
                  maxLength={300}
                  rows={5}
                  // autoSize={true}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType='button'
                  block
                  shape="round"
                  type='primary'
                  className='warning'
                  style={{marginTop:30}}
                  onClick={() => setVisibleModal(true)}
                >
                  LEER TERMINOS
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType='submit'
                  block
                  shape="round"
                  type='primary'
                  className='warning'
                  // style={{marginTop:30}}
                  loading={loadingSendMessage}
                >
                  ENVIAR
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

      {visibleModal && (
        <Modal
          title='Términos'
          visible={visibleModal}
          footer={false}
          onCancel={() => setVisibleModal(false)}
        >
          <div style={{textAlign: 'center', fontSize:12}}>
            Usted está accediendo al Libro de Reclamaciones de la clinica. Antes de ingresar, por favor leer atentamente las indicaciones. <br/><br/>
            Un reclamo es la expresión de insatisfacción o disconformidad del usuario respecto de la atención brindada por nuestra entidad en el ejercicio de su función administrativa, de acuerdo al D.S. N° 042-2011-PCM. <br/><br/>
            De tener alguna consulta puede hacerla aquí. <br/><br/>
            En caso usted desee presentar una queja por alguna irregularidad en la atención de un procedimiento a cargo de la clinica, ello NO es un reclamo. En todo caso, usted debe presentar una carta o escrito, ante nuestra Mesa de Partes, ubicada en direccion. <br/><br/>
            El registro de su reclamo será enviado a un buzón a cargo del responsable del Libro de Reclamaciones de la clinica, y una copia será enviada a su correo electrónico. De acuerdo a la norma, le brindaremos una respuesta en un plazo máximo de treinta (30) días hábiles. <br/><br/>
            Tener en cuenta que la fecha y hora de confirmación de la recepción será de acuerdo al horario de Mesa de Partes de la clinica (lunes a viernes de 08:30 a.m. a 04:30 p.m.). Pasado este horario o en días distintos, la solicitud podrá ser ingresada, pero se tendrá por presentada a partir del día hábil siguiente. <br/><br/>
            Para formular su reclamo y este sea atendido oportunamente, usted deberá registrase aquí: <br/><br/>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ClaimsPage;