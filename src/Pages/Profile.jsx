import axios from "axios";
import { Image, UserCircleIcon } from "lucide-react";
import React from "react";

const Profile = () => {
  const sessionData = localStorage["Login"];
  const Raw = sessionData && JSON.parse(sessionData);
  const [Session, setData] = React.useState(Raw);
  const [editaMode, seteditaMode] = React.useState(false);

  const handleEdit = () => {
    seteditaMode(!editaMode);
  };

  const handleSave = async (e) => {
    try {
      const response = await axios.patch(
        "https://akpl-backend-production.up.railway.app/users/" + Session.id,
        Session
      );
      console.log(response);
      localStorage.setItem("Login", JSON.stringify(Session));
      seteditaMode(!editaMode);
    } catch (error) {
      console.log(error);
    }
    console.log(Session);
  };

  return (
    <div className="w-full p-20">
      <div className="">
        <div className="border-b border-gray-900/10 pb-12 ">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This indivation will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div>{Session.role}</div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="Kode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID User
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="Kode"
                    id="Kode"
                    autoComplete="Kode"
                    value={Session.id}
                    disabled={true}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
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
                    value={Session.name}
                    disabled={!editaMode}
                    onChange={(e) => {
                      setData({ ...Session, name: e.target.value });
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
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
                    value={Session.username}
                    disabled={!editaMode}
                    onChange={(e) => {
                      setData({ ...Session, username: e.target.value });
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
                    value={Session.email}
                    disabled={!editaMode}
                    onChange={(e) => {
                      setData({ ...Session, email: e.target.value });
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
                    value={Session.number}
                    onChange={(e) => {
                      setData({ ...Session, number: e.target.value });
                    }}
                    disabled={!editaMode}
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
                  value={Session.alamat}
                  onChange={(e) => {
                    setData({ ...Session, alamat: e.target.value });
                  }}
                  disabled={!editaMode}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-6 flex items-center justify-end gap-x-6">
        {!editaMode && (
          <button
            onClick={handleEdit}
            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Edit
          </button>
        )}
        {editaMode && (
          <>
            <button
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setData(Raw);
                seteditaMode(!editaMode);
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
