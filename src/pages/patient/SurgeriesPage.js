import React from "react";
import {
  Card,
  Col,
  Row
} from "antd";

const SurgeriesPage = () => {
  return (
    <>
      <div className="layout-content">
        <Row
          gutter={[24,0]}
          justify='center'
        >
          <Col
            xl={20} lg={20} md={20} sm={24} xs={24}
            className='mb-24'
          >
            <Card
              title='Reservar cirugía'
            >
              pagina de cirugias
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SurgeriesPage;