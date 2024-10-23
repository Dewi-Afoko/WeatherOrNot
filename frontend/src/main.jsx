import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css"; // Ensure this CSS file exists

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);