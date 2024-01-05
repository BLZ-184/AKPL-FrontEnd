import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
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
  const [open2, setOpen2] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState(null);
  const [orderDetail, setOrderDetail] = React.useState(null);
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);
  const openChat = async (value) => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/Pengaduan/" + value
    );
    console.log(value, response);
    setDataDetail(response.data);
    setDetail(value);
  };

  useEffect(() => {
    getPengaduan();
    getUser();
  }, []);

  const getUserDetail = async (value) => {
    console.log(value);
    const response = await getUsersID(value);
    const response2 = await getOrderID(response?.idOrder);
    console.log(response, response2);
    setUserDetail(response);
    setOrderDetail(response2);
  };

  const getUsersID = async (value) => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/users/" + value
    );
    return response.data;
  };
  const getOrderID = async (value) => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/OrderID/" + value
    );
    return response.data;
  };

  const getPengaduan = async () => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/Pengaduan"
    );
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
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/users"
    );
    setdataUsers(response.data);
    return response.data;
  };

  const buatPengaduan = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://akpl-backend-production.up.railway.app/Pengaduan",
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
        "https://akpl-backend-production.up.railway.app/Pengaduan/" +
          data +
          "/" +
          value
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-6 sm:p-20">
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
            <div className="flex items-center gap-3 justify-between w-full py-5 px-5">
              <Avatar
                size="sm"
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <div className="-mt-px flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Tania Andrew
                </Typography>
              </div>
              <Button
                onClick={() => {
                  getUserDetail(detail);
                  handleOpen2();
                }}
              >
                detail
              </Button>
            </div>
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
        <Dialog open={open2} handler={handleOpen2}>
          <DialogHeader>Detail Users</DialogHeader>
          <DialogBody>
            {userDetail && (
              <table className="w-full min-w-max table-auto text-left">
                <tbody>
                  {Object.keys(userDetail).map((key) => {
                    if (key === "password") {
                      return null;
                    }
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{userDetail[key]}</td>
                      </tr>
                    );
                  })}
                  {orderDetail && (
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="font-bold my-5"
                    >
                      Detail Order Aktif
                    </Typography>
                  )}
                  {orderDetail &&
                    Object.keys(orderDetail).map((key) => {
                      if (key === "password") {
                        return null;
                      }
                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{orderDetail[key]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="blue"
              onClick={() => {
                handleOpen2(null);
              }}
            >
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Dialog>
    </div>
  );
};

export default ReportPengaduan;
