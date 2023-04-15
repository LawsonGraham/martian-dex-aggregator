import logo from './logo.svg';
import './App.css';
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import getCoins from './hooks/getCoins';

function App() {
  const [account, setAccount] = useState("0x7a26be858cbdf707c9b01d9b462a8fadae81cfe28f97805b2d15584208b60436");
  const [coins, setCoins] = useState([]);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const [swap, setSwap] = useState({});
  const [swapLoading, setSwapLoading] = useState(false);


  const connectMartian = async () => {
    const response = await window.martian.connect();
    console.log(response)
    setAccount(response.address)
  };

  const executeSwap = async () => {
    if (swap.api_type == 'open_ocean') {
      const payload = {
        function: swap.data.function,
        type_arguments: swap.data.type_arguments,
        arguments: swap.data.arguments,
      };
  
      const transaction = await window.martian.generateTransaction("0x7a26be858cbdf707c9b01d9b462a8fadae81cfe28f97805b2d15584208b60436", payload);
      const txnHash = await window.martian.signAndSubmitTransaction(transaction);
  
      console.log(txnHash);
      return txnHash;
    } else {
      // if we use thala
      // we probably won't be able to actually make this work
    }
  };

  const quoteThalaSwap = async (inputCoin, outputCoin, amount) => {
    // const res = await fetch(`http://localhost:3000/api/swap?input-coin=0x7fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL&output-coin=0x1::aptos_coin::AptosCoin&in-or-out-amount=10&pool-limit=3&in-for-out=true`,  {method: 'GET'})
    const res = await fetch(`http://localhost:3000/api/swap?input-coin=${inputCoin}&output-coin=${outputCoin}&in-or-out-amount=${amount}&pool-limit=3&in-for-out=false`).then( async (res) => 
    {
      const response = await res.json();

      if (response) {
        const data = response.data;
        // const result = await this.myWallet.sdk.eth.sendTransaction(swapParams);
        return data;
      } else {
        return;
      }
    });
    console.log('done ThalaQuote')
    return res
  };

  const quoteOpenOceanSwap = async (inputCoin, outputCoin, amount) => {
    const chain = "aptos";
    const inTokenAddress = inputCoin.split("::")[0]
    const outTokenAddress = outputCoin.split("::")[0]
    const gasPrice = 5;
    const slippage = 1;
    const res = await fetch(
      `https://open-api.openocean.finance/v3/aptos/swap_quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=${gasPrice}&slippage=${slippage}&chain=${chain}&account=${account}`
    ).then( async (res) => 
    {
      const response = await res.json();
      if (response) {
        const { estimatedGas, data, gasPrice } = response;
        // const result = await this.myWallet.sdk.eth.sendTransaction(swapParams);
        return data
      } else {
        return;
      }
    });
    console.log('done Quote')
    return res
  };

  const quote = async (inputCoin, outputCoin, amount) => {
    setSwapLoading(true)
    console.log('quoting...')
    const q1 = await quoteOpenOceanSwap(inputCoin, outputCoin, amount);
    const q2 = await quoteThalaSwap(inputCoin, outputCoin, amount);

    q1.outAmount = parseFloat(q1.outAmount) / 100000000
    q1.api_type = 'open_ocean'
    q2.api_type = 'thala'
    q2.outAmount = q2.inputAmount

    console.log(q1)
    console.log(q2)

    if (q1.outAmount > q2.outAmount) {
      setSwap(q1)
    } else {
      setSwap(q2)
    }
    setSwapLoading(false)
  }

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
      <button onClick={executeSwap} className="large">
        makeSwap
      </button>
      <button onClick={() => quote("0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin", "0x1::aptos_coin::AptosCoin", 0.5)} className="large">
        quote swaps
      </button>
      <button onClick={quoteThalaSwap} className="large">
        quote thala
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
      {swapLoading ? <div>loading</div> : <div>swap type chosen: {swap.api_type}</div> }
    </div>

  );
}

export default App;
