import React  from "react";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Routes from "./routes";
import "moment/locale/es-mx";
import {AuthContext} from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContext>
        <Routes />
      </AuthContext>
    </div>
  );
}

export default App;
