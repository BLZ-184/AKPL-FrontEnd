import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { CardTagihan } from "./Tagihan/Tagihan";
import { getTagihan2 } from "../../Components/Layouts/DashboardUser";

const TABLE_HEAD = ["id Transaksi", "Tanggal dibuat", "Produk", ""];

const RiwayatTransaksi = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const [datadetail, setDataDetail] = React.useState();
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const handleOpen3 = async (value) => {
    const response = await getTagihan2(value);
    setDataDetail(response);
  };

  useEffect(() => {
    getRiwatatransaksi();
  }, []);
  const getRiwatatransaksi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/OrderUser/" + Session.id
      );
      setTABLE_ROWS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaksiID = async (value) => {
    const response = await axios.get(
      "http://localhost:1000/Transaksi/" + value
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="w-full">
      <div className="space-y-12 p-20">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Riwayat Transaksi
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi Riwayat Transaksi
              </p>
            </div>
          </div>
          <Card className="h-72 w-full mt-10 overflow-y-auto">
            <table className="w-full min-w-max table-auto text-left ">
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
                  ({ idtransaksi, kodeProduk, createdAt, id }, index) => (
                    <tr key={idtransaksi} className="even:bg-blue-50/50">
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
                          {createdAt.split("T")[0]}
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
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => handleOpen3(id)}
                        >
                          Detail
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>

          <Dialog open={datadetail} handler={handleOpen3} size="lg">
            <DialogBody>
              {datadetail && <CardTagihan data={datadetail} status />}
            </DialogBody>
            <DialogFooter className="space-x-4">
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
                color="blue"
                onClick={() => {
                  handleOpen3(null);
                }}
              >
                <span>Close</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RiwayatTransaksi;
