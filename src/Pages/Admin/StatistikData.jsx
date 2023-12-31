import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import Statistik from "../../Components/Layouts/Statistik";
import axios from "axios";
import { getTagihan2 } from "../../Components/Layouts/DashboardUser";
import { CardTagihan, createPDF } from "../Users/Tagihan/Tagihan";

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

  const [datadetail, setDataDetail] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const handleOpen3 = async (value) => {
    const response = await getTagihan2(value);
    setDataDetail(response);
  };

  React.useEffect(() => {
    getAllOrderan();
  }, []);

  const getAllOrderan = async () => {
    try {
      const response = await axios.get("http://localhost:1000/OrderTransaksi");
      console.log(response.data);
      setTABLE_ROWS(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setLunas = async (id) => {
    try {
      const response = await axios.patch(
        "http://localhost:1000/SetLunas/" + id
      );
      console.log(response.data);
      getAllOrderan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20">
      <Statistik />
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
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
                {TABLE_ROWS.map(
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
                    <tr key={name} className="even:bg-blue-50/50">
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
                          onClick={() => handleOpen3(idOrder)}
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

      <Dialog open={datadetail} handler={handleOpen3} size="lg">
        <DialogBody>
          {datadetail && <CardTagihan data={datadetail} />}
        </DialogBody>
        <DialogFooter className="space-x-4">
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setLunas(datadetail.idtransaksi);
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
              xmlns="http://www.w3.org/2000/svg"
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
              handleOpen3(null);
            }}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StatistikData;
