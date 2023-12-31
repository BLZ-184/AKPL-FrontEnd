import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modals from "./Dialog";
import Logo from "../Elements/Logo";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  console.log(Session);

  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <aside className="h-screen shadow-2xl ">
      <nav
        className="h-full flex flex-col bg-blue-800 border-r
        "
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <Logo expanded={expanded} color={"white"} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronFirst color="#007DFC" />
            ) : (
              <ChevronLast color="#007DFC" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 ">{children}</ul>
        </SidebarContext.Provider>

        <Menu placement="top">
          <MenuHandler>
            <div className="flex p-3" onClick={() => setExpanded(!expanded)}>
              <img
                src={
                  Session.image ??
                  "https://th.bing.com/th/id/R.98fd5107cc6e41a1c0bd49289d863a1f?rik=LMKgHNqXDH8G2A&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG.png&ehk=%2bRw6Gx3u57%2fACYW3MfLygtsoE%2fOOVGjvsM8PMQNAQvE%3d&risl=&pid=ImgRaw&r=0"
                }
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold text-white">{Session.name}</h4>
                  <span className="text-xs text-white">{Session.email}</span>
                </div>
                <MoreVertical size={20} color="white" />
              </div>
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem
              className="hover:bg-blue-300 text-black "
              onClick={() => navigate("/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem
              className="hover:bg-blue-300 text-black "
              onClick={handleOpen}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        <Modals
          open={open}
          title={"Logout"}
          handler={() => setOpen(false)}
          setCancle={() => setOpen(false)}
          setConfirm={() => {
            setOpen(false);
            localStorage.removeItem("Login");
            navigate("/");
          }}
        >
          Apakah kamu yakin untuk Logout?
        </Modals>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-3
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          to == window.location.pathname
            ? "bg-gradient-to-tr from-blue-500 to-blue-400 text-white"
            : "hover:bg-blue-500 text-white "
        }
    `}
      onClick={() => {
        navigate(to);
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 hover:bg-white rounded ${
            expanded ? "" : "top-2"
          } ${active === to ? "bg-white" : "bg-blue-800"}`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-blue-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 w-max
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
