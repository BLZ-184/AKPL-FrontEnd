import axios from "axios";
import React, { useEffect } from "react";
import Modals from "../../Components/Layouts/Dialog";

const Pengaduan = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);

  const [pengaduan, setPengaduan] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [msg, setMsg] = React.useState("");

  const checkPengaduan = async () => {
    try {
      const response = await axios.get(
        "http://akpl-backend-production.up.railway.app/Pengaduan/" + Session.id
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setPengaduan(response.data);
      } else {
        setPengaduan(false);
      }
    } catch (error) {
      setPengaduan(false);
      console.log(error);
    }
  };

  if (pengaduan) {
    console.log(pengaduan);
  }

  const buatPengaduan = async (data) => {
    console.log(Session);
    try {
      const response = await axios.post(
        "http://akpl-backend-production.up.railway.app/Pengaduan",
        data
      );
      const response2 = await axios.patch(
        "http://akpl-backend-production.up.railway.app/Pengaduan/" +
          Session.id +
          "/" +
          "not"
      );
      console.log(response);
      checkPengaduan();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkPengaduan();
  }, []);

  return (
    <div className="w-screen">
      <div>
        {!pengaduan && (
          <div className="bg-gray-100 p-10 h-screen">
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Buat pengaduan
                </h5>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-800 text-white shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  Buat
                </button>
              </div>
            </div>
          </div>
        )}
        {pengaduan && (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {pengaduan &&
                  pengaduan.map((pengaduan) => {
                    if (pengaduan.from === "sistem") {
                      return (
                        <div className="flex w-full mt-2 space-x-3 justify-center">
                          <div>
                            <span className="text-xs text-gray-500 leading-none">
                              {pengaduan.msg} {pengaduan.createdAt}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    if (pengaduan.from !== Session.name) {
                      return (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs">
                          <div>
                            {pengaduan.from}
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                              <p className="text-sm">{pengaduan.msg}</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                              {pengaduan.createdAt}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    if (pengaduan.from === Session.name) {
                      return (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div className="text-right">
                            {pengaduan.from}
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p className="text-sm">{pengaduan.msg}</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                              {pengaduan.createdAt}
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
                      idpengadu: Session.id,
                      msg,
                      from: Session.name,
                      status: "not",
                    });
                  }}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modals
        open={open}
        title={"Pengaduan"}
        handler={() => setOpen(false)}
        setCancle={() => setOpen(false)}
        setConfirm={() => {
          buatPengaduan({
            idpengadu: Session.id,
            from: "sistem",
            msg: `${Session.name} membuka pengaduan.`,
            status: "not",
          });
          setOpen(!open);
        }}
      >
        Apakah kamu yakin untuk buat pengaduan?
      </Modals>
    </div>
  );
};

export default Pengaduan;
