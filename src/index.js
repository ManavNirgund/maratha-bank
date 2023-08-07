import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

Kommunicate.init("a68fc91d61c634315b7ad3065a1823d4", {
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
