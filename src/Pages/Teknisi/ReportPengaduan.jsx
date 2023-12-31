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

const TABLE_HEAD = ["No", "Nama", "Tanggal", "Status", ""];

const ReportPengaduan = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const [detail, setDetail] = React.useState(null);
  const [datadetail, setDataDetail] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [dataUsers, setdataUsers] = React.useState([]);

  const [msg, setMsg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const openChat = async (value) => {
    const response = await axios.get(
      "http://localhost:1000/Pengaduan/" + value
    );
    console.log(value, response);
    setDataDetail(response.data);
    setDetail(value);
  };

  useEffect(() => {
    getPengaduan();
    getUser();
  }, []);

  const getPengaduan = async () => {
    const response = await axios.get("http://localhost:1000/Pengaduan");
    const uniqueIdpengaduSet = new Set();
    const uniqueId = response.data.filter((data) => {
      const { idpengadu } = data;

      if (uniqueIdpengaduSet.has(idpengadu)) {
        return false;
      }
      uniqueIdpengaduSet.add(idpengadu);
      return true;
    });

    console.log(uniqueId);
    setTABLE_ROWS(uniqueId);
  };

  const getUser = async (value) => {
    const response = await axios.get("http://localhost:1000/users");
    setdataUsers(response.data);
    return response.data;
  };

  const buatPengaduan = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:1000/Pengaduan",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (data, value) => {
    console.log(data);
    try {
      const response = await axios.patch(
        "http://localhost:1000/Pengaduan/" + data + "/" + value
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20">
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Report Pengaduan
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Silahkan tanggapi Pengaduan
              </p>
            </div>
          </div>
          <Card className="h-full w-full mt-10">
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
                  ({ id, updatedAt, idpengadu, status }, index) => (
                    <tr key={id} className="even:bg-blue-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {idpengadu}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dataUsers.map((user) => {
                            if (user.id == idpengadu) {
                              return user.name;
                            }
                          })}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {updatedAt.split("T")[0]}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {status == "not"
                            ? "Belum Ditanggapi"
                            : status == "open"
                            ? "Dibaca"
                            : status}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => {
                            openChat(idpengadu);
                            handleStatus(idpengadu, "open");
                            handleOpen();
                          }}
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
        </div>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-800">
            <div className="flex flex-col flex-grow w-full h-[80vh] bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {datadetail &&
                  datadetail.map((datadetail) => {
                    if (datadetail.from === "sistem") {
                      return (
                        <div className="flex w-full mt-2 space-x-3 justify-center">
                          <div>
                            <span className="text-xs text-gray-500 leading-none">
                              {datadetail.msg} {datadetail.createdAt}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    if (datadetail.from !== Session.name) {
                      return (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs">
                          <div>
                            {datadetail.from}
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                              <p className="text-sm">{datadetail.msg}</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                              {datadetail.createdAt}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    if (datadetail.from === Session.name) {
                      return (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div className="text-right">
                            {datadetail.from}
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p className="text-sm">{datadetail.msg}</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                              {datadetail.createdAt}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="bg-gray-300 p-4 flex">
                <input
                  className="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  placeholder="Type your message…"
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                />
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => {
                    buatPengaduan({
                      idpengadu: detail,
                      msg,
                      from: Session.name,
                      status: "Ditanggapi " + Session.name,
                    });
                    handleStatus(detail, "Ditanggapi " + Session.name);
                    openChat(detail);
                  }}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ReportPengaduan;
