import React, {useContext, useEffect, useRef, useState} from "react";
import {
  Button,
  Card,
  Col, Form, Input,
  Row, Table, Typography, Upload
} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {apiPath, axiosInstance} from "../../utils/api";
import openNotification from "../../utils/openNotification";
import {createArticle} from "../../utils/formsData";
import moment from "moment";
import {MyContext} from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye} from "@fortawesome/free-solid-svg-icons";

const ArticlesPage = () => {
  const formRef = useRef();
  const { authAdmin } = useContext(MyContext);
  const { Text } = Typography;
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const columns = [
    {
      title: 'TITULO',
      key: 'titulo',
      dataIndex: 'titulo',
    },
    {
      title: 'FECHA DE PUBLICACION',
      key: 'fechaCrea',
      dataIndex: 'fechaCrea',
      render: (fechaCrea) => <span>{moment(fechaCrea).format('lll')}</span>
    },
    {
      title: 'FECHA DE MODIFICACION',
      key: 'fechaMod',
      dataIndex: 'fechaMod',
      render: (fechaCrea) => <span>{moment(fechaCrea).format('lll')}</span>
    },
    {
      title: 'AUTOR',
      key: 'autor',
      dataIndex: 'autor',
    },
    {
      title: 'EDITOR',
      key: 'admin',
      dataIndex: 'admin',
    },
    {
      title: 'ACCIONES',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      render: (key) => (
        <>
          <div className="ant-employed">
            <Text
              style={{margin: '0 auto'}}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Text>
          </div>
        </>
      )
    },
  ];

  const getRecentArticles = () => {
    setLoadingArticles(true);
    axiosInstance
      .get(apiPath.article.getRecent)
      .then(({ data }) => {
        if (data.success) setArticles(data.data);
        else openNotification('Articulos', data.message, 'warning');
        setLoadingArticles(false);
      })
      .catch(e => openNotification(
        'Articulos',
        'Error en la petición',
        'error'));
  }

  const handleCreateArticle = async values => {
    setLoadingSave(true);
    const dataFormat = {
      ...values,
      imagen: values.imagen[0].originFileObj,
      idAdmin: authAdmin.idAdmin
    }

    const { success, message } = await createArticle(dataFormat);
    if (success) {
      openNotification('Articulo', message);
      getRecentArticles();
      formRef.current.resetFields();
    }
    else openNotification('Articulo', message, 'warning');
    setLoadingSave(false);
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    getRecentArticles();
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24,0]} justify='center' className='mb-24'>
          <Col xl={20} lg={20} md={20} sm={24} xs={24}>
            <Card title='Nuevo articulo'>
              <Form
                name='form-article'
                layout='vertical'
                ref={formRef}
                onFinish={handleCreateArticle}
              >
                <Row gutter={[24,0]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label='Título'
                      name='titulo'
                      rules={[
                        {
                          required: true,
                          message: "Complete este campo!"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Imagen"
                    >
                      <Form.Item
                        name="imagen"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: 'Adjunte un archivo de imagen!'
                          }
                        ]}
                      >
                        <Upload.Dragger
                          name='file'
                          method='get'
                          multiple={false}
                          maxCount={1}
                          beforeUpload={file => {
                            const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                            if (!isImage) openNotification('Archivo', 'El archivo tiene que ser de tipo imagen', 'warning');
                            return isImage || Upload.LIST_IGNORE;
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Clic aquí o arrastra tu imagen</p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label='Autor'
                      name='autor'
                      rules={[
                        {
                          required: true,
                          message: "Complete este campo!"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Contenido'
                      name='contenido'
                      rules={[
                        {
                          required: true,
                          message: "Complete este campo!"
                        }
                      ]}
                    >
                      <Input.TextArea
                        rows={6}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24,0]} justify='end'>
                  <Col>
                    <Button
                      htmlType='submit'
                      type='primary'
                      loading={loadingSave}
                    >
                      Crear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24,0]} justify='center' className='mb-24'>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card title='Articulos recientes'>
              <div className="table-responsive">
                <Table
                  size='small'
                  columns={columns}
                  pagination={{
                    pageSize: 10
                  }}
                  dataSource={articles}
                  loading={loadingArticles}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ArticlesPage;