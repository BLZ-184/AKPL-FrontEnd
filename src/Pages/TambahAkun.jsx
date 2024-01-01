import axios from "axios";
import React from "react";
import Modals from "../Components/Layouts/Dialog";

const TambahAkun = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const [akun, setAkun] = React.useState({
    name: "",
    email: "",
    username: "",
    password: "",
    number: "",
    alamat: "",
    role: "User",
    createBy: Session.name,
  });

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  console.log(akun);

  const handleSave = async (e) => {
    try {
      const response = await axios.post(
        "https://akpl-backend-production.up.railway.app/users",
        akun
      );
      console.log(response);
      setOpen(!open);
      handleOpen2();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 ">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Tambah Akun
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This indivation will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="nama"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    autoComplete="nama"
                    value={akun.name}
                    onChange={(e) => {
                      setAkun({ ...akun, name: e.target.value });
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="Role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  id="Role"
                  name="Role"
                  autoComplete="Role"
                  onChange={(e) => {
                    setAkun({ ...akun, role: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>User</option>
                  <option>Teknisi</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={akun.username}
                    onChange={(e) => {
                      setAkun({ ...akun, username: e.target.value });
                    }}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={akun.password}
                    onChange={(e) => {
                      setAkun({ ...akun, password: e.target.value });
                    }}
                    autoComplete="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="Email"
                    id="Email"
                    value={akun.email}
                    onChange={(e) => {
                      setAkun({ ...akun, email: e.target.value });
                    }}
                    autoComplete="Email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="Nomor"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nomor
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="Nomor"
                    id="Nomor"
                    autoComplete="Nomor"
                    value={akun.number}
                    onChange={(e) => {
                      setAkun({ ...akun, number: e.target.value });
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Alamat"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alamat
              </label>
              <div className="mt-2">
                <textarea
                  id="Alamat"
                  name="Alamat"
                  rows={3}
                  value={akun.alamat}
                  onChange={(e) => {
                    setAkun({ ...akun, alamat: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
          <div className="m-6 flex items-center justify-end gap-x-6">
            <button className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              onClick={handleOpen}
              className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <Modals
        open={open}
        title={"Tambah akun"}
        handler={() => setOpen(false)}
        setCancle={() => setOpen(false)}
        setConfirm={handleSave}
      >
        Apakah kamu yakin untuk membuat akun ini?
      </Modals>
      <Modals
        open={open2}
        title={"Tambah akun"}
        handler={() => setOpen2(false)}
        setConfirm={() => setOpen2(false)}
      >
        Tambah Akun berhasil dibuat!
      </Modals>
    </div>
  );
};

export default TambahAkun;
