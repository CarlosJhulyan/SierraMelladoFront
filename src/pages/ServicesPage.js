import React from "react";
import g1 from "../assets/images/sign-in-doctor.png";
import g2 from "../assets/images/sign-in-patient.png";
import g3 from "../assets/images/sign-in-admin.png";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";

const ServicesPage = () => {
  const cards = [
    {
      key: 1,
      image: g1,
      descripcion: 'MÉDICOS',
      link: '/medico/ingreso'
    },
    {
      key: 2,
      image: g2,
      descripcion: 'PACIENTES',
      link: '/paciente/ingreso'
    },
    {
      key: 3,
      image: g3,
      descripcion: 'PERSONAL',
      link: '/admin/sign-in'
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
              <h2>SERVICIOS</h2>
            </div>
          </Col>
          <Col span={20}>
            <Row gutter={[24,0]} justify='space-around'>
              {cards.map(card => (
                <Link to={card.link} key={card.key} className="card tarjeta" style={{width: '20rem'}}>
                  <div className="imgTarjeta">
                    <img src={card.image} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body text-center">
                    <p style={{textAlign:'justify', fontSize:16}} className='text-center'>
                      {card.descripcion}
                    </p>
                  </div>
                </Link>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ServicesPage;