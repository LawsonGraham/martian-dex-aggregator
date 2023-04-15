import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
  const account =
    "0x7a26be858cbdf707c9b01d9b462a8fadae81cfe28f97805b2d15584208b60436";
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
    } else {
      return;
    }
  });

  
};

// const connectMartian = async () => {
//   // Create a transaction
//   const response = await window.martian.connect();
//   const sender = response.address;
//   // const payload = {
//   //   function: "0x1::coin::transfer",
//   //   type_arguments: ["0x1::aptos_coin::AptosCoin"],
//   //   arguments: [
//   //     "0x997b38d2127711011462bc42e788a537eae77806404769188f20d3dc46d72750",
//   //     50,
//   //   ],
//   // };
//   // const transaction = await window.martian.generateTransaction(sender, payload);
//   // const txnHash = await window.martian.signAndSubmitTransaction(transaction);
// };
export default function Home() {
  
  // connectMartian()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={getSwap} className="text:black">
        getSwap
      </button>
    </main>
  );
}
