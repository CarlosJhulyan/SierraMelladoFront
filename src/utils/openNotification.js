import {notification} from "antd";

function openNotification(title, message, type = 'success', icon) {
  notification[type]({
    message: title,
    description: message,
    icon
  })
}

export default openNotification;