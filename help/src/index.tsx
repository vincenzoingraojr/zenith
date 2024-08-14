import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/style.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
