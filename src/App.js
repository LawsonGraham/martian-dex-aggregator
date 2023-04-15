import logo from './logo.svg';
import './App.css';
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import getCoins from './hooks/getCoins';

function App() {
  const [account, setAccount] = useState("");
  const [coins, setCoins] = useState([]);
  const [coinsLoading, setCoinsLoading] = useState(true);


  const connectMartian = async () => {
    const response = await window.martian.connect();
    console.log(response)
    setAccount(response.address)
  };

  const getSwap = async () => {
    console.log("dfdf");
    const chain = "aptos";
    const inTokenAddress =
      "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa";
    const outTokenAddress =
      "0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5";
    const amount = 10;
    const gasPrice = 5;
    const slippage = 1;
    const res = await fetch(
      `https://open-api.openocean.finance/v3/aptos/swap_quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=${gasPrice}&slippage=${slippage}&chain=${chain}&account=${account}`
    ).then( async (res) => 
    {
      const response = await res.json();
      if (response) {
        const { estimatedGas, data, gasPrice } = response.data;
        // const result = await this.myWallet.sdk.eth.sendTransaction(swapParams);
        console.log(data);
        const payload = {
          function: data.function,
          type_arguments: data.type_arguments,
          arguments: data.arguments,
        };
    
        const transaction = await window.martian.generateTransaction("0x7a26be858cbdf707c9b01d9b462a8fadae81cfe28f97805b2d15584208b60436", payload);
        const txnHash = await window.martian.signAndSubmitTransaction(transaction);
    
        console.log(txnHash);
        return txnHash;
      } else {
        return;
      }
    });
  
    
  };

  useEffect(() => {
    if (coins.length == 0) {
      getCoins().then(res => {
        setCoins(res);
        setCoinsLoading(false)
      });
    }
  });
  
  


  return (

    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={getSwap} className="large">
        getSwap
      </button>
      <button onClick={connectMartian} className="large">
        connectMartian
      </button>
      {!coinsLoading && coins.map(coin => {
        return(
        <div>
          coin: {coin.name}
        </div>
        )
      })}
    </div>

  );
}

export default App;
