import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainView } from "./views/MainView";
import "./global/default.css";
import { StoreProvider } from "./store";
import { KioskLayout } from "./components/KioskLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <KioskLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
          </Routes>
        </BrowserRouter>
      </KioskLayout>
    </StoreProvider>
  </React.StrictMode>
);
