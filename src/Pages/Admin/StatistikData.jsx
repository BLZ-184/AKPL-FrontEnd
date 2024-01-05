import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import React from "react";
import Statistik from "../../Components/Layouts/Statistik";
import axios from "axios";
import { getTagihan2 } from "../../Components/Layouts/DashboardUser";
import { CardTagihan, createPDF } from "../Users/Tagihan/Tagihan";
import Modals from "../../Components/Layouts/Dialog";

const TABLE_HEAD = [
  "idOrder",
  "idPelanggan",
  "idtransaksi",
  "jumlah",
  "kodeProduk",
  "metode",
  "name",
  "orderCreate",
  "status",
  "",
];

const StatistikData = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);

  const [datadetail, setDataDetail] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [open2, setOpen2] = React.useState(null);

  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterTransaksi, setFilterTransaksi] = React.useState(null);
  const [filterPelanggan, setFilterPelanggan] = React.useState("");
  const [filterOrder, setFilterOrder] = React.useState("");

  const handleOpen = async (value) => {
    const response = await getTagihan2(value);
    setDataDetail(response);
  };

  React.useEffect(() => {
    getAllOrderan();
  }, []);

  const getAllOrderan = async () => {
    try {
      const response = await axios.get(
        "https://akpl-backend-production.up.railway.app/OrderTransaksi"
      );
      console.log(response.data);
      setTABLE_ROWS(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setLunas = async (id) => {
    try {
      const response = await axios.patch(
        "https://akpl-backend-production.up.railway.app/SetLunas/" + id
      );
      getAllOrderan();
      setOpen(false);
      setOpen2(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-6 sm:p-20">
      <Statistik />
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between mt-10">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Data Transaksi
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi Data Transaksi
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Input
                type="text"
                name="filterOrder"
                id="filterOrder"
                onChange={(e) => {
                  setFilterOrder(e.target.value);
                }}
                autoComplete="filterOrder"
                label="Cari id Order"
              />
              <Input
                type="text"
                name="filterpelanggan"
                id="filterpelanggan"
                onChange={(e) => {
                  setFilterPelanggan(e.target.value);
                }}
                autoComplete="filterpelanggan"
                label="Cari id pelanggan"
              />
              <Input
                type="text"
                name="filtertransaksi"
                id="filtertransaksi"
                onChange={(e) => {
                  setFilterTransaksi(e.target.value);
                }}
                autoComplete="filtertransaksi"
                label="Cari id transaksi"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <Select label="Filter Status">
                  <Option onClick={() => setFilterStatus("All")}>All</Option>
                  <Option onClick={() => setFilterStatus("Lunas")}>
                    Lunas
                  </Option>
                  <Option onClick={() => setFilterStatus("Belum Lunas")}>
                    Belum Lunas
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          <Card className="h-72 w-full mt-10 overflow-y-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-100 bg-blue-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.filter((data) =>
                  filterStatus == "All" ? true : data.status === filterStatus
                )
                  .filter((data) =>
                    filterPelanggan
                      ? data.idPelanggan.includes(filterPelanggan)
                      : true
                  )
                  .filter((data) =>
                    filterOrder ? data.idOrder == filterOrder : true
                  )
                  .filter((data) =>
                    filterTransaksi
                      ? data.idtransaksi.includes(filterTransaksi)
                      : true
                  )
                  .map(
                    (
                      {
                        idOrder,
                        idPelanggan,
                        idtransaksi,
                        jumlah,
                        kodeProduk,
                        metode,
                        name,
                        orderCreate,
                        status,
                      },
                      index
                    ) => (
                      <tr key={idtransaksi} className="even:bg-blue-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {idOrder}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {idPelanggan}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {idtransaksi}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {jumlah}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {kodeProduk}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {metode}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {orderCreate.split("T")[0]}{" "}
                            {orderCreate.split("T")[1].split(".")[0]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            onClick={() => handleOpen(idOrder)}
                          >
                            Tagihan
                          </Typography>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Dialog open={datadetail} handler={handleOpen} size="lg">
        <DialogBody>
          {datadetail && <CardTagihan data={datadetail} />}
        </DialogBody>
        <DialogFooter className="space-x-4">
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setOpen(datadetail.idtransaksi);
            }}
          >
            <span>Confirmasi Pembayaran</span>
          </Button>
          <Button
            variant="gradient"
            color="grey"
            onClick={() => {
              createPDF();
            }}
            className="inline-flex justify-center items-center gap-2"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="https://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>PDF</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              handleOpen(null);
            }}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Modals
        open={open}
        title={"Konfirmasi Pembayaran"}
        handler={() => setOpen(false)}
        setCancle={() => setOpen(false)}
        setConfirm={() => setLunas(open)}
      >
        Apakah anda yakin untuk mengonfirmasi pembayaran ini?
      </Modals>
      <Modals
        open={open2}
        title={"Konfirmasi Pembayaran"}
        handler={() => setOpen2(false)}
        setConfirm={() => setOpen2(false)}
      >
        Konfirmasi Pembayaran Berhasil!
      </Modals>
    </div>
  );
};

export default StatistikData;
