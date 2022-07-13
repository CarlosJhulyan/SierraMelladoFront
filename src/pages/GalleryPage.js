import React from "react";
import {
  Col,
  Row
} from "antd";
import g1 from "../assets/images/g1.png";
import g2 from "../assets/images/g2.png";
import g3 from "../assets/images/g3.png";
import g4 from "../assets/images/g4.png";
import g5 from "../assets/images/g5.png";
import g6 from "../assets/images/g6.png";


const GalleryPage = () => {
  const cards = [
    {
      key: 1,
      image: g1,
      descripcion: 'ENTREVISTA PARA UNA REVISIÓN GINECOLÓGICA',
    },
    {
      key: 2,
      image: g2,
      descripcion: 'DISPOSITIVOS DE EXAMEN ULTRASONOGRÁFICO',
    },
    {
      key: 3,
      image: g3,
      descripcion: 'ÁREA DE TRABAJO',
    },
    {
      key: 4,
      image: g4,
      descripcion: 'EQUIPO QUIROFANO',
    },
    {
      key: 5,
      image: g5,
      descripcion: 'TEST DE PRUEBA DE EMBARAZO',
    },
    {
      key: 6,
      image: g6,
      descripcion: 'ANÁLISIS DE ENFERMEDADES DE TRANSMISIÓN SEXUAL(ETS)',
    },
  ];

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
            <div className="text-center" style={{marginBottom:50}}>
              <h2>GALERÍA</h2>
            </div>
          </Col>
          <Col span={20}>
            <Row gutter={[24,0]} justify='space-around'>
              {cards.map(card => (
                <div key={card.key} className="card tarjeta" style={{width: '20rem'}}>
                  <div className="imgTarjeta">
                    <img src={card.image} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body text-center">
                    <p style={{textAlign:'justify', fontSize:16}} className='text-center'>
                      {card.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GalleryPage;