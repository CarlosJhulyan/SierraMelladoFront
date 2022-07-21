import React, {useEffect, useState} from "react";
import {
  Col,
  Descriptions, Image,
  Modal, Row, Spin
} from "antd";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import moment from "moment";
import {baseUrlImage} from "../../config/backend";

const ModalDetailsDate = ({
  currentDate,
  visible,
  setVisible,
}) => {
  const [loadingData, setLoadingData] = useState(true);
  const [detailsDate, setDetailsDate] = useState({});

  const getDetailsDate = () => {
    setLoadingData(true);
    axiosInstance
      .get(`${apiPath.date.getDetails}/${currentDate.idCita}`)
      .then(({ data }) => {
        if (data.success) setDetailsDate(data.data);
        else openNotification('Detalles de cita', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e => openNotification(
        'Detalles de cita',
        'Error en la petición',
        'error'
      ));
  }

  useEffect(() => {
    if (currentDate) getDetailsDate();
  }, [currentDate]);

  return (
    <>
      {currentDate && (
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={false}
          width={900}
          title={`Detalles de Cita`}
        >
          <Spin spinning={loadingData} tip='Cargando detalles...'>
            <Row gutter={[24,0]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className='mb-24'>
                <Descriptions title='Detalles de cita'>
                  <Descriptions.Item span={3} label='Descripción'>
                    {detailsDate.descripcion}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Fecha de cita'>
                    {moment(detailsDate.fecha).format('ll')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Hora de cita'>
                    {moment(detailsDate.hora, 'H').format('h a')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Servicio'>
                    {detailsDate.descServicio}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className='mb-24'>
                <Descriptions title='Detalles de paciente'>
                  <Descriptions.Item span={3} label='Paciente'>
                    {detailsDate.nombresP} {detailsDate.apPaternoP} {detailsDate.apMaternoP}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label='Correo'>
                    {detailsDate.correoP}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Celular'>
                    +51 {detailsDate.celularP}
                  </Descriptions.Item>
                  <Descriptions.Item label='DNI'>
                    {detailsDate.dniP}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className='mb-24'>
                <Descriptions title={`Detalles de orden # ${String(detailsDate.numOrden).padStart(9, '0')}`}>
                  <Descriptions.Item span={3} label='Vaucher'>
                    <Image
                      src={baseUrlImage + detailsDate.descOrden}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label='Estado'>
                    {detailsDate.estadoOrden === 'P' && 'Pendiente'}
                    {detailsDate.estadoOrden === 'R' && 'Revisado'}
                    {detailsDate.estadoOrden === 'A' && 'Atendido'}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Monto total'>
                    S/. {detailsDate.montoTotal}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Forma de pago'>
                    {detailsDate.descMetodo}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Spin>
        </Modal>
      )}
    </>
  );
}

export default ModalDetailsDate;