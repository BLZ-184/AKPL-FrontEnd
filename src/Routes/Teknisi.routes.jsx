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
    text: "User Aktif",
    to: "/UserAktif",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Report Pengaduan",
    to: "/ReportPengaduan",
  },
];

export default TeknisiMenu;
