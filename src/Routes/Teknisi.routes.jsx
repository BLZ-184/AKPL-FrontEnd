import { LayoutDashboard } from "lucide-react";

const TeknisiMenu = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    to: "/dashboard",
    gap: true,
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Report Pengaduan",
    to: "/ReportPengaduan",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Tambah Akun",
    to: "/TambahAkun",
  },
];

export default TeknisiMenu;
