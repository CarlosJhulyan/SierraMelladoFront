import React, {
  useEffect,
  useState
} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faClock, faEnvelope, faFileCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {Avatar, Badge, Dropdown, List} from "antd";
import {apiPath, axiosInstance} from "../utils/api";
import openNotification from "../utils/openNotification";
import moment from "moment";
import {Link} from "react-router-dom";

function NotificationsHeader() {
  const [pendientMessages, setPendientMessages] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const menu = (
    <List
      min-width="100%"
      className="header-notifications-dropdown"
      itemLayout="horizontal"
      dataSource={pendientMessages}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                {item.tipo === "C" ?
                  <FontAwesomeIcon icon={faEnvelope} color='#56BFCF' /> :
                  <FontAwesomeIcon icon={faFileCircleExclamation} color='#56BFCF' />
                }
              </Avatar>
            }
            title={(
              <Link to='/admin/buzon-mensajes'>{item.correoRem}</Link>
            )}
            description={moment(item.fechaEmi).format('lll')}
          />
        </List.Item>
      )}
    />
  );

  const getPendientMessages = () => {
    setLoadingData(true);
    axiosInstance
      .get(apiPath.message.getPending)
      .then(({ data }) => {
        if (data.success) setPendientMessages(data.data.map(item => {
          return {
            ...item,
            correoRem: `${item.correoRem.substring(0,20)}...`
          };
        }));
        else openNotification('Mensajes', data.message, 'warning');
        setLoadingData(false);
      })
      .catch(e =>
        openNotification('Mensajes', 'Error al traer los mensajes', 'error'));
  }

  useEffect(() => {
    getPendientMessages();
  }, [])

  return (
    <Badge count={loadingData ? <FontAwesomeIcon icon={faClock} /> : pendientMessages.length}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <FontAwesomeIcon icon={faBell} />
        </a>
      </Dropdown>
    </Badge>
  );
}

export default NotificationsHeader;