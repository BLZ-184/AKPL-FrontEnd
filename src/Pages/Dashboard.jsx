import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardAdmin from "../Components/Layouts/DashboardAdmin";
import DashboardUser from "../Components/Layouts/DashboardUser";
import DashboardTeknisi from "../Components/Layouts/DashboardTeknisi";
import { getSessionUpdate } from "../App";

const Dashboard = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    user: 0,
    teknisi: 0,
    layanan: 0,
  });
  console.log(data);
  const getData = async () => {
    const response2 = await axios.get(
      "http://akpl-backend-production.up.railway.app/ISP"
    );
    const response = await axios.get(
      "http://akpl-backend-production.up.railway.app/users"
    );
    setData({
      user: response.data.filter((user) => user.role === "User").length,
      teknisi: response.data.filter((user) => user.role === "Teknisi").length,
      layanan: response.data.length,
    });
    console.log(response, response2);
  };

  getSessionUpdate();

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-screen p-20">
      {Session.role == "Admin" && <DashboardAdmin />}
      {Session.role == "User" && <DashboardUser />}
      {Session.role == "Teknisi" && <DashboardTeknisi />}
    </div>
  );
};

export default Dashboard;
