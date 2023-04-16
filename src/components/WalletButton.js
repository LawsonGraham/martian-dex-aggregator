import React, { useEffect, useState } from "react";
import styles from "../styles";

const WalletButton = ({ setAccount }) => {
  const [rendered, setRendered] = useState("");

  const connectMartian = async () => {
    const response = await window.martian.connect();
    console.log(response);
    setAccount(response.address);
    setRendered(response.address)
  };


  return (
    <button
      onClick={connectMartian}
      className="sexyButton2"
    >
      {rendered === "" && <div className="text-white font-poppins font-black">{"Connect Wallet"}</div>}
      {rendered !== "" && <div className="text-white font-poppins font-black ">{rendered.substring(0, 7) + "..."}</div>}
    </button >
  );


};

export default WalletButton;