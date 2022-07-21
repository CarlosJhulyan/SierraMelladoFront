import React, {
  useEffect,
  useState
} from "react";
import {Modal} from "antd";
import {baseUrlImage} from "../config/backend";
import PdfReader from "./PdfReader";

const ModalPdfReport = ({
  visible,
  setVisible,
  currentFile
}) => {
  const [file, setFile] = useState();
  useEffect(() => {
    setFile(baseUrlImage + currentFile);
  }, [currentFile]);

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <a
            target='_blank'
            href={file}
            download={`informe-${Date.now()}.pdf`}
          >
            Descargar
          </a>
        ]}
      >
        <PdfReader
          pdf={file}
        />
      </Modal>
    </>
  );
}

export default ModalPdfReport;