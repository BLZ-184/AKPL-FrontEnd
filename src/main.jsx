import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import StatistikData from "./Pages/Admin/StatistikData";
import ViewData from "./Pages/Admin/ViewData";
import TambahAkun from "./Pages/TambahAkun";
import ReportPengaduan from "./Pages/Teknisi/ReportPengaduan";
import Informasi from "./Pages/Users/Informasi";
import Pengaduan from "./Pages/Users/Pengaduan";
import OrderPage from "./Pages/Users/Order";
import RiwayatTransaksi from "./Pages/Users/RiwayatTransaksi";
import UserAktif from "./Pages/Teknisi/UserAktif";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<App Component={Dashboard} />} />
        <Route path="/Profile" element={<App Component={Profile} />} />
        <Route path="/ViewData" element={<App Component={ViewData} />} />
        <Route path="/statistik" element={<App Component={StatistikData} />} />
        <Route path="/TambahAkun" element={<App Component={TambahAkun} />} />
        <Route
          path="/ReportPengaduan"
          element={<App Component={ReportPengaduan} />}
        />
        <Route path="/Informasi" element={<App Component={Informasi} />} />
        <Route path="/Pengaduan" element={<App Component={Pengaduan} />} />
        <Route path="/Order" element={<App Component={OrderPage} />} />
        <Route path="/UserAktif" element={<App Component={UserAktif} />} />
        <Route
          path="/RiwayatTransaksi"
          element={<App Component={RiwayatTransaksi} />}
        />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
