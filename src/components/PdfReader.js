import React, {
  useState
} from "react";
import {
  Document,
  Page,
  pdfjs
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import path from "path";

const PdfReader = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
  const pdfWorkerPath = path.join(pdfjsDistPath, 'legacy', 'build', 'pdf.worker.js');

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages)
    setNumPages(numPages);
  }

  return (
    <Document
      file={'http://localhost:5282/files/archivo_prueba.pdf'}
      options={{
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
        worker: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
        cMapPacked: true,
      }}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={e => {
        console.log(e)
      }}
      onLoadProgress={({ loaded, total }) => {
        console.log('Loading a document: ' + (loaded / total) * 100 + '%');
      }}
      error='Fallo al cargar el PDF'
      loading='Cargando documento...'
      noData='No existe un documento PDF...'
    >
      <Page
        width={500}
        height={300}
        pageNumber={pageNumber}
      />
    </Document>
  );
}

export default PdfReader;