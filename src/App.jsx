import SideBar, { SidebarItem } from "./Components/Layouts/SideBar";
import React from "react";

import AdminMenu from "./Routes/Admin.routes";
import TeknisiMenu from "./Routes/Teknisi.routes";
import UserMenu from "./Routes/User.routes";
import axios from "axios";

export default function App({ Component }) {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  getSessionUpdate();

  let Menus = false;
  if (Session.role == "Admin") {
    Menus = AdminMenu.map((item, index) => (
      <React.Fragment key={index}>
        <SidebarItem icon={item.icon} text={item.text} to={item.to} />
        {item.gap && <br className="my-2" />}
      </React.Fragment>
    ));
  } else if (Session.role == "Teknisi") {
    Menus = TeknisiMenu.map((item, index) => (
      <React.Fragment key={index}>
        <SidebarItem icon={item.icon} text={item.text} to={item.to} />
        {item.gap && <br className="my-2" />}
      </React.Fragment>
    ));
  } else if (Session.role == "User") {
    Menus = UserMenu.map((item, index) => (
      <React.Fragment key={index}>
        <SidebarItem icon={item.icon} text={item.text} to={item.to} />
        {item.gap && <br className="my-2" />}
      </React.Fragment>
    ));
  }

  return (
    <div className="flex">
      <SideBar>
        <br className="my-2" />
        {Menus}
      </SideBar>
      <div className="w-screen h-screen flex overflow-y-auto bg-gray-100">
        <Component />
      </div>
    </div>
  );
}

export const getSessionUpdate = async () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  try {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/users/" + Session.id
    );
    console.log("update", response.data);
    localStorage.setItem("Login", JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};
