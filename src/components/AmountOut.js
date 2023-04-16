import React, { useState, useEffect, useRef } from "react";

import { chevronDown } from "../assets";

import styles from "../styles";
import useOnClickOutside  from "../utils/useClickOutside";

const AmountOut = ({onChange, currencyValue, onSelect, coins, coinOut, setCoinOut, swap}) => {
    const [showList, setShowList] = useState(false);
    const ref = useRef();

    const amountOut = 10000; // INSERT CONVERSION FUNCTION 

    useOnClickOutside(ref, () => setShowList(false))

    return (
        <div className={styles.amountContainer}>
            <input
                placeholder='0'
                type="number"
                value={swap && swap.outAmount ? swap.outAmount.toFixed(4) : 0}
                disabled
                className={styles.amountInput}
            />
            <div className='relative' onClick={() => setShowList(!showList)}>
                <button className={styles.currencyButton}>
                    {coinOut ? coinOut.name : "Select"}
                    <img
                        src={chevronDown}
                        alt="chevron-down"
                        className={`w-4 h-4 object-contain ml-4 ${showList ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
                {showList && (
                    <ul className={styles.currencyList}>
                        {coins.map((coin, index) => (
                            <li
                                key={index}
                                className={`${styles.currencyListItem} ${showList ?
                                    'bg-site-dim2' : ''} cursor-pointer`}
                                onClick={() => {
                                    // if (typeof onSelect === "function") onSelect(token);
                                    setCoinOut(coin);
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

    )
}

export default AmountOut;