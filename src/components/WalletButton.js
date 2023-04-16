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
      className={styles.walletButton}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered.substring(0, 7) + "..."}
    </button >
  );


};

export default WalletButton;