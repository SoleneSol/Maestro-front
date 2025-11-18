import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
        <App />
    </HashRouter>
);
