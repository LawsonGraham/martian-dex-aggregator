import "./App.css";
import { useState, useEffect } from "react";
import getCoins from "./hooks/getCoins";
import styles from "./styles";
import WalletButton from "./components/WalletButton";
import Swap from  "./components/Swap.js";
import ShootingStarBackground from "./components/ShootingStars.js";


function App() {
  const [account, setAccount] = useState(
    "0x7a26be858cbdf707c9b01d9b462a8fadae81cfe28f97805b2d15584208b60436"
  );
  const [coins, setCoins] = useState([]);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const [swap, setSwap] = useState({});
  const [swapLoading, setSwapLoading] = useState(false);

  useEffect(() => {
    if (coins.length == 0) {
      getCoins().then((res) => {
        setCoins(res);
        setCoinsLoading(false);
      });
    }
  });

  return (
<div className={styles.container} style={{overflow: "hidden", zIndex: 2}}>
    <ShootingStarBackground />  
    <div>
    </div>
      <div className={styles.innerContainer}>
        <header className={styles.header} style={{zIndex: 69}}>
          <WalletButton className="sexyButton" setAccount={setAccount}/>
        </header>
        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle} style={{zIndex: 69}}> Martian DEX</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>
          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                <Swap coins={coins} account={account}/>
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
      <img src={"https://cdn.discordapp.com/attachments/1097000989204172851/1097032589409263666/3d-astronaut-flies-in-open-space-rigged-character-you-can-make-any-pose-cartoon-spaceman-png.png"} alt="image" style={{ zIndex: 82, position: "fixed", height: 700, left: 60, top: 250, pointerEvents: "none"}}/>
      <img src="https://cdn.discordapp.com/attachments/1097000989204172851/1097035515917762650/mars-in-3d-render-for-graphic-asset-web-presentation-or-other-png.png" style={{zIndex: 83, position: "fixed", height: 600, pointerEvents: "none", right: -200, top: -300}}/>
      <img src="https://static.vecteezy.com/system/resources/previews/008/507/067/original/3d-astronaut-flies-in-open-space-rigged-character-you-can-make-any-pose-cartoon-spaceman-png.png" style={{zIndex: 83, position: "fixed", height: 600, pointerEvents: "none", right: -100, top: 350}}/>
      
    </div>
    
  
  );
}

export default App;
