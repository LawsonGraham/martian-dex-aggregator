import React, { useState, useEffect, useRef } from "react";

import styles from "../styles";
import useOnClickOutside  from "../utils/useClickOutside";

import Dropdown from "./Dropdown";

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
                value={swap && swap.api_type == 'thala' ? swap.inputAmount.toFixed(4) : swap.outAmount ? swap.outAmount.toFixed(4) : 0 }
                disabled
                className={styles.amountInput}
                style={{color: "rgba(255,255,255,0.5)"}}
            />
            <div className='relative' onClick={() => setShowList(!showList)}>
            <Dropdown coin1={coinOut} coins={coins} setCoin={setCoinOut} />

            </div>
        </div>

    )
}

export default AmountOut;