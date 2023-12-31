import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = React.useState(" ");

  const prosesLogin = async (value) => {
    try {
      const response = await axios.post("http://localhost:1000/login", value);
      localStorage.setItem("Login", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="fixed top-0 bottom-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 lg:bottom-0 lg:h-auto lg:w-full">
        <div className="absolute inset-0 lg:bg-[#00000066] "> </div>
        <img
          src="https://wallpaperaccess.com/full/195651.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="mb-5">
              <img
                src="https://www.itg.ac.id/wp-content/uploads/2021/08/logo-putih-ITG.png"
                alt="Logo ITG"
                className="w-1/2 h-1/2 mx-auto mb-8 hidden"
              />
              <h1 className="text-2xl text-center">
                Sistem informasi dan Admin Internet Service Provider
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autocomplete="off"
                    id="username"
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Username"
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                  <label
                    for="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                  />
                  <label
                    for="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="flex flex-col text-center gap-y-2">
                  <p>{msg}</p>
                  <button
                    className="bg-blue-500 text-white rounded-md w-full py-1"
                    onClick={() => {
                      prosesLogin(data);
                    }}
                  >
                    Login
                  </button>
                  <p className="hidden">
                    Belum punya akun?{" "}
                    <button className="text-blue-500">Daftar</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
