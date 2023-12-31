import React from "react";
import Tagihan from "./Tagihan/Tagihan";
import Order from "./Tagihan/Order";

const OrderPage = () => {
  const sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  return (
    <div className="w-screen bg-gray-100">
      {Session.idOrder && <Tagihan />}
      {!Session.idOrder && <Order />}
    </div>
  );
};

export default OrderPage;
