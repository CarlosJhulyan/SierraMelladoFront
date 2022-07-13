import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import logo from "./assets/images/logo.png";

ReactDOM.render(
  <Suspense fallback={<div className='loader'><img src={logo} alt=""/></div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root"),
);
