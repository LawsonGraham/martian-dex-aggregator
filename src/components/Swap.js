import React, { useState, useEffect, useRef } from "react";
import AmountIn  from "./AmountIn.js";
import AmountOut  from "./AmountOut.js";

import { scaleUp, parseLiquidityPoolType } from "../utils/thalaPools";
import styles from "../styles";
import userEvent from "@testing-library/user-event";

const Swap = ({coins, account}) => {
    const [swap, setSwap] = useState({});
    const [coinIn, setCoinIn] = useState(null);
    const [coinOut, setCoinOut] = useState(null);
    const [swapInputAmount, setSwapInputAmount] = useState(0);

    const [swapLoading, setSwapLoading] = useState(false);

    const executeSwap = async (inputCoin, outputCoin, amount) => {
        let payload;
        if (swap.api_type == "open_ocean") {
          //open ocean
          payload = {
            function: swap.data.function,
            type_arguments: swap.data.type_arguments,
            arguments: swap.data.arguments,
          };
        } else {
          // thala
          // TODO: make this work for weighted pools
          const poolType = parseLiquidityPoolType(swap.pool.type);
          let coinInIndex;
          for (let i = 0; i < swap.pool.coins.length; i++) {
            if (swap.pool.coins[i].address == swap.inputCoin) {
              coinInIndex = i;
            }
          }
          const coinInDecimals = swap.pool.coins[coinInIndex].decimals;
    
          if (poolType == "weighted") {
            const type_args = swap.pool.coinAddresses;
            while (type_args.length != 4) {
              type_args.push(
                "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null"
              );
            }
            
            const weights = swap.pool.weights;
            for (let i = 0; i < weights.length; i++) {
              type_args.push(`0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool::Weight_${weights[i]}`)
            }
            while (type_args.length != 8) {
              type_args.push(
                "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null"
                );
            }
    
            type_args.push(swap.outputCoin);
            type_args.push(swap.inputCoin);

            payload = {
              type: "entry_function_payload",
              function: `0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool_scripts::swap_exact_in`,
              type_arguments: type_args,
              arguments: [
                scaleUp(swap.outputAmount, coinInDecimals).toFixed(0),
                scaleUp(0, coinInDecimals).toFixed(0),
              ],
            };
          } else {
            const type_args = swap.pool.coinAddresses;
            while (type_args.length != 4) {
              type_args.push(
                "0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null"
              );
            }
    
            type_args.push(swap.inputCoin);
            type_args.push(swap.outputCoin);
    
            payload = {
              type: "entry_function_payload",
              function: `0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::stable_pool_scripts::swap_exact_in`,
              type_arguments: type_args,
              arguments: [
                scaleUp(swap.outputAmount, coinInDecimals).toFixed(0),
                scaleUp(0, coinInDecimals).toFixed(0),
              ],
            };
          }
        }
    
        const transaction = await window.martian.generateTransaction(
          account,
          payload
        );
        const txnHash = await window.martian.signAndSubmitTransaction(transaction);
    
        console.log(txnHash);
        return txnHash;
    };

    const quoteThalaSwap = async (inputCoin, outputCoin, amount) => {
        const res = await fetch(
        `http://localhost:3000/api/swap?input-coin=${outputCoin}&output-coin=${inputCoin}&in-or-out-amount=${amount}&pool-limit=20&in-for-out=false`
        ).then(async (res) => {
        const response = await res.json();

        if (response) {
            const data = response.data;
            return data;
        } else {
            return;
        }
        });
        console.log("done ThalaQuote");
        return res;
    };

    const quoteOpenOceanSwap = async (inputCoin, outputCoin, amount) => {
        const chain = "aptos";
        console.log(inputCoin)
        const inTokenAddress = inputCoin;
        console.log(outputCoin)
        const outTokenAddress = outputCoin;
        const gasPrice = 5;
        const slippage = 1;
        const res = await fetch(
        `https://open-api.openocean.finance/v3/aptos/swap_quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&gasPrice=${gasPrice}&slippage=${slippage}&chain=${chain}&account=${account}`
        ).then(async (res) => {
        const response = await res.json();
        if (response) {
            const { estimatedGas, data, gasPrice } = response;
            // const result = await this.myWallet.sdk.eth.sendTransaction(swapParams);
            return data;
        } else {
            return;
        }
        });
        console.log("done Quote");
        return res;
    };

    const quote = async (inputCoin, outputCoin, amount) => {
        setSwapLoading(true);
        console.log("quoting...");
        let q1 = {};
        let q2 = {};
        // try {
        q1 = await quoteOpenOceanSwap(inputCoin, outputCoin, amount);
        // } catch {}
        try {
        q2 = await quoteThalaSwap(inputCoin, outputCoin, amount);
        } catch {}

        if (q1 != undefined) {
        // if the token isn't supported by open ocean
        q1.outAmount = parseFloat(q1.outAmount) / (10 ** q1.outToken.decimals);
        q1.api_type = "open_ocean";
        }

        if (q2 != undefined) {
        q2.api_type = "thala";
        q2.outAmount = q2.inputAmount;
        }

        console.log(q1);
        console.log(q2);

        if (q1 && q2) {
            if (q2.outAmount && q1.outAmount && q1.outAmount > q2.outAmount) {
                setSwap(q1);
            } else if (q2.outAmount && q1.outAmount && q1.outAmount <= q2.outAmount) {
                setSwap(q2);
            } else if (!q1.outAmount && q2.outAmount) {
                setSwap(q2);
            } else if (!q2.outAmount && q1.outAmount) {
                setSwap(q1);
            } else {
                setSwap(null)
            }
        } else if (!q1 && q2) {
        setSwap(q2);
        } else if (!q2 && q1) {
            setSwap(q1);
        } else {
            swap.outAmount = 0;
        }
        console.log(swap)
        setSwapLoading(false);
    };  

    return (
        <div className='flex flex-col w-full items-center position-absolute'>
      <div className='mb-8'>
        <AmountIn coins={coins} swap={setSwap} quote={quote} coinOut={coinOut} setCoinIn={setCoinIn} coinIn={coinIn} setSwapInputAmount={setSwapInputAmount} swapInputAmount={swapInputAmount} />
        <AmountOut coins={coins} swap={swap} coinOut={coinOut} setCoinOut={setCoinOut} />
        </div>
        <div className="text-white">slippage: {swap.outAmount ? +((swap.outAmount / (swap.outAmount * 1.1 + 0.0001)) / 1060) : 0}%</div>
        <div className="text-white" >fee: {swap.outAmount ? +((swap.outAmount * .03)) : 0} {coinOut ? coinOut.name : ""}</div>
        
        <button className="sexyButton" onClick={() => executeSwap(coinIn.customAddress, coinOut.customAddress, swapInputAmount)}>{swapLoading ? <img src={"https://media0.giphy.com/media/F6O1O2saVuBbYCfZhm/200w.gif?cid=6c09b9524z7adapx69ykiys8jsrs29kphit4xd93k3am2sxv&rid=200w.gif&ct=g"} alt="image" style={{ height: 55 }}/> : "Exectute Swap"}</button>
        
        </div>

    )
}
export default Swap;