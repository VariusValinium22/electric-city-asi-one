import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./views/StartPage";
import "./global/default.css";
import { StoreProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
