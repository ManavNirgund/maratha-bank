import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

Kommunicate.init("1c8c0569c0ed0f6e95f9934341ad2300c", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
