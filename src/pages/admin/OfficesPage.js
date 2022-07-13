import React from "react";
import {Card, Col, Row, Typography} from "antd";

const OfficesPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center'>
          <Col span={20}>
            <Card>
              <Title style={{color: '#48487F'}}>Oficina de Administración</Title>
              <Paragraph>
                <blockquote>Encargada de lograr que la Clinica cuente con los recursos humanos, materiales y económicos necesarios, así como del mantenimiento y servicios generales, para el cumplimiento de sus objetivos estratégicos y funcionales asignados.</blockquote>
              </Paragraph>
              <Title style={{color: '#48487F'}}>Director Administrativo</Title>
              <Paragraph>
                <blockquote>Participa en la conducción adecuada de la marcha de la DIRECCIÓN ADMINISTRATIVA cumpliendo las funciones delegadas por la Dirección Ejecutiva.</blockquote>
              </Paragraph>
              <Title style={{color: '#48487F'}}>Secretaria</Title>
              <Paragraph>
                <blockquote>Encargada de ejecutar y coordinar actividades completas de apoyo secretarial y técnico administrativo.</blockquote>
              </Paragraph>
              <Title style={{color: '#48487F'}}>Organización de la unidad</Title>
              <Paragraph>
                <blockquote>La oficina de Administración cuenta con unidades de Apoyo para el logro de ls objetivos estratégicos de la Clínica.</blockquote>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OfficesPage;