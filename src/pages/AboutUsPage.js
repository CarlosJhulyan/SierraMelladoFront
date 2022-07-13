import React from "react";
import {Button, Col, Row} from "antd";
import quienesSomos from "../assets/images/quienes-somos.png";
import {Link} from "react-router-dom";

const AboutUsPage = () => {
  return (
    <>
      <div>
        <Row
          gutter={[24, 0]}
          style={{width:'100%',margin:0,marginBottom:100,marginTop:100}}
          justify='center'
          align='middle'
        >
          <Col span={24}>
            <div className="text-center" style={{marginBottom:100}}>
              <h2>¿QUIÉNES SOMOS?</h2>
            </div>
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22} className='mb-24'>
            <img src={quienesSomos} alt="imagen de servicios" />
          </Col>
          <Col xl={9} lg={10} md={11} sm={20} xs={22}>
            <div className="text-center" style={{marginBottom:50}}>
              <p style={{fontSize:17}}>
                El centro ginecológico Sierra Mellado es un centro de alta especialización en la salud de la mujer;
                creado para la prevención , diagnóstico y tratamiento oportuno a favor de la mujer Ayacuchana.
              </p>
              <p style={{fontSize:17}}>
                Visita nuestra galería y conocenos un poco más
              </p>
            </div>
            <Button
              block
              type='primary'
              style={{
                fontSize: 20
              }}
              className='warning'
              size='large'
            >
              <Link to='/galeria'>Galería</Link>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AboutUsPage;