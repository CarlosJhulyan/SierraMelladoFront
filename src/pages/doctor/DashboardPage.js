import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Timeline,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import LineChart from "../../components/chart/LineChart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUserDoctor, faUserGroup, faUserInjured} from "@fortawesome/free-solid-svg-icons";

function DashboardPage() {
  const { Title, Text } = Typography;

  const count = [
    {
      today: "Nuevos clientes hoy",
      title: "200",
      persent: "+10%",
      icon: <FontAwesomeIcon icon={faUserInjured} size='2x' />,
      bnb: "bnb2",
    },
    {
      today: "Nuevos clientes",
      title: "+100",
      persent: "-15%",
      icon: <FontAwesomeIcon icon={faUserGroup} size='2x' />,
      bnb: "redtext",
    },
    {
      today: "Nuevas entradas",
      title: "+40",
      persent: "20%",
      icon: <FontAwesomeIcon icon={faEnvelope} size='2x' />,
      bnb: "bnb2",
    },
    {
      today: "Nuevos trabajadores",
      title: "+2",
      persent: "5%",
      icon: <FontAwesomeIcon icon={faUserDoctor} size='2x' />,
      bnb: "bnb2",
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="h-full">
              <div>
                <Title level={5}>Mi actividad</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  este mes <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                    pending="Cargando..."
                    className="timelinelist"
                >
                  {timelineList.map((t, index) => (
                      <Timeline.Item color={t.color} key={index}>
                        <Title level={5}>{t.title}</Title>
                        <Text>{t.time}</Text>
                      </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashboardPage;