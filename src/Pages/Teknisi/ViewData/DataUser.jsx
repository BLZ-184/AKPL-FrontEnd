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

const TABLE_HEAD = ["ID User", "Tanggal dibuat", "Nama", "Kategori", ""];
const DataUser = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const [detail, setDetail] = React.useState(null);
  const [datadetail, setDataDetail] = React.useState(null);
  const [orderDetail, setOrderDetail] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const handleOpen3 = async (value) => {
    const response = await getUsersID(value);
    const response2 = await getOrderID(response?.idOrder);
    setDataDetail(response);
    setOrderDetail(response2);
    setDetail(value);
  };

  console.log(datadetail);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      "https://akpl-backend-production.up.railway.app/users"
    );
    console.log(response.data);
    setTABLE_ROWS(response.data);
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

  const [namaFilter, setnamaFilter] = React.useState("");

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Data User
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Informasi Data User
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <label
            htmlFor="anggota"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cari Nama
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              name="cariNama"
              id="cariNama"
              onChange={(e) => {
                setnamaFilter(e.target.value);
              }}
              autoComplete="anggota"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Zayan"
            />
          </div>
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
            {TABLE_ROWS.filter(({ name }) =>
              namaFilter != ""
                ? name.toLowerCase().includes(namaFilter.toLowerCase())
                : true
            )
              .filter((value) => value.role === "User")
              .filter((value) => value.idOrder !== null)
              .map(({ id, name, createdAt, role }, index) => (
                <tr key={name} className="even:bg-blue-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
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
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {role}
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
              ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={detail} handler={handleOpen3}>
        <DialogHeader>Detail Users</DialogHeader>
        <DialogBody>
          {datadetail && (
            <table className="w-full min-w-max table-auto text-left">
              <tbody>
                {Object.keys(datadetail).map((key) => {
                  if (key === "password") {
                    return null;
                  }
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{datadetail[key]}</td>
                    </tr>
                  );
                })}
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold my-5"
                >
                  Detail Order Aktif
                </Typography>
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

export default DataUser;
