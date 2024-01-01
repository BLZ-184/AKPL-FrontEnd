import {
  History,
  Info,
  LayoutDashboard,
  MessagesSquare,
  Receipt,
} from "lucide-react";

const UserMenu = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <Info size={20} />,
    text: "Informasi",
    to: "/Informasi",
    gap: true,
  },
  {
    icon: <MessagesSquare size={20} />,
    text: "Pengaduan",
    to: "/Pengaduan",
  },
  {
    icon: <Receipt size={20} />,
    text: "Order / Tagihan",
    to: "/Order",
  },
  {
    icon: <History size={20} />,
    text: "Riwayat Transaksi",
    to: "/RiwayatTransaksi",
  },
];

export default UserMenu;
