import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./views/StartPage";
import "./global/default.css";

console.log("Hello World");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
