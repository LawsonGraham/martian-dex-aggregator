import React, { useState, useEffect, useRef } from "react";

import { chevronDown } from "../assets";

import styles from "../styles";
import useOnClickOutside  from "../utils/useOnClickOutside";


const AmountIn = ({value, onChange, currencyValue, onSelect,}) => {
    const [showList, setShowList] = useState(false);
    const [activeCurrency, setActiveCurrency] = useState("Select");

    const currencies = { "btc": "btc", "eth": "eth" };

    useOnClickOutside(ref, () => setShowList(false))

    const checker = () => {
        console.log("availableTokens");
        console.log();
        console.log(currencyValue);
        console.log(availableTokens);
        console.log(activeCurrency);
        return "0";
      }


    return(
    <div className={styles.amountContainer}>
      <input
        placeholder={checker()}
        type="number"
        value={value}
        disabled={isSwapping}
        onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
        className={styles.amountInput}
      />

<div className="relative" onClick={() => setShowList((prevState) => !prevState)}>
        <button className={styles.currencyButton}>
          {activeCurrency}
          <img
            src={chevronDown}
            alt="cheveron-down"
            className={`w-4 h-4 object-contain ml-2 ${
              showList ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>
      </div>
      {showList && (
          <ul ref={ref} className={styles.currencyList}>
            {Object.entries(currencies).map(([token, tokenName], index) => (
              <li
                key={index}
                className={`${styles.currencyListItem} ${
                  activeCurrency === tokenName ? "bg-site-dim2" : ""
                  } cursor-pointer`}

                onClick={() => {
                  if (typeof onSelect === "function") onSelect(token);
                  setActiveCurrency(tokenName);
                  setShowList(false);
                }}
              >
                {tokenName}
              </li>
            ))}
          </ul>
        )}
      </div>


      

    )
}

export default AmountIn;