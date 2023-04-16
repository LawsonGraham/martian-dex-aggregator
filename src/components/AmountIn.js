import React, { useState, useEffect, useRef } from "react";

import { chevronDown } from "../assets";

import styles from "../styles";
import useOnClickOutside  from "../utils/useClickOutside";

const AmountOut = ({onChange, currencyValue, onSelect, coins, swap, quote, coinOut, coinIn, setCoinIn}) => {
    const [showList, setShowList] = useState(false);

    const [activeCurrency, setActiveCurrency] = useState("Select");
    const [swapInputAmount, setSwapInputAmount] = useState("Select");

    const ref = useRef();

    const amountOut = 10000; // INSERT CONVERSION FUNCTION 

    useOnClickOutside(ref, () => setShowList(false))

    useEffect(() => {
        // if (Object.keys(currencies).includes(currencyValue))
        //     setActiveCurrency(currencyValue);
        setActiveCurrency("Select");
    }, []);

    useEffect(() => {
        if (coinIn && coinOut && swapInputAmount) quote(coinIn.customAddress, coinOut.customAddress, swapInputAmount)
    }, [swapInputAmount, coinIn, coinOut]);

    return (
        <div className={styles.amountContainer}>
            <input
                placeholder='0'
                type="number"
                value={swapInputAmount}
                onChange={(e) => setSwapInputAmount(e.target.value)}
                className={styles.amountInput}
            />
            <div className='relative' onClick={() => setShowList(!showList)}>
                <button className={styles.currencyButton}>
                    {coinIn ? coinIn.name : "Select"}
                    <img
                        src={chevronDown}
                        alt="chevron-down"
                        className={`w-4 h-4 object-contain ml-4 ${showList ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
                <div className="currencyList">
                {showList && (
                    <ul className={styles.currencyList}>
                        {coins.map((coin, index) => (
                            <li
                                key={index}
                                className={`${styles.currencyListItem} ${showList ?
                                    'bg-site-dim2' : ''} cursor-pointer`}
                                onClick={() => {
                                    // if (typeof onSelect === "function") onSelect(token);
                                    setCoinIn(coin);
                                    setShowList(false);
                                }}
                            >
                                {coin.name}
                            </li>
                        ))
                        }

                    </ul>
                )}
                </div>

            </div>
        </div>

    )
}

export default AmountOut;


