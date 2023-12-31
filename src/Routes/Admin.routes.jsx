import { LayoutDashboard } from "lucide-react";

const AdminMenu = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    to: "/dashboard",
    gap: true,
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Statistik Data",
    to: "/statistik",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "View Data",
    to: "/ViewData",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Tambah Akun",
    to: "/TambahAkun",
  },
];

export default AdminMenu;
