const styles = {
  // App.js
  container: " flex justify-center min-h-screen sm:px-16 px-6 bg-black",
  innerContainer:
    "flex justify-between items-center flex-col max-w-[1280px] w-full",
  header: "flex flex-row justify-between items-center w-full sm:py-10 py-6",
  exchangeContainer:
    "shadow-lg flex-1 flex justify-start items-center flex-col w-full mt-10 ",
  headTitle: "text-white font-poppins font-black text-6xl tracking-tight",
  subTitle: "text-dim-white font-poppins font-medium mt-3 text-base",
  exchangeBoxWrapper: "mt-10 w-full flex justify-around",
  exchangeBox:
    "flex justify-around relative md:max-w-[700px] md:max-h-[600px] md:min-h-[400px] md:min-w-[500px] min-w-full max-w-full gradient-border p-[2px] rounded-3xl",
  exchange:
    "position-absolute w-full max-w-[400px] min-w-[400px] min-h-[400px] max-h-[400px] bg-site-orange backdrop-blur-[4px] rounded-3xl shadow-card flex p-6",

  // AmountIn & AmountOut
  amountContainer:
    "amountContainer flex flex-row space-between w-full min-w-full bg-site-dim border-[0px] min-h-[96px] sm:p-8 p-4 rounded-[20px]",
  amountInput:
    "amountInput w-full flex-1 bg-transparent  font-poppins font-black text-2xl text-white",
  currencyButton:
    "flex flex-row items-center bg-site-dim2 py-2 px-4 rounded-xl font-poppins font-bold text-white",
  currencyList:
    "currencyList z-10 right-0 bg-site-black border-[1px] border-site-dim2 w-full mt-2 rounded-lg min-w-[170px]",
  currencyListItem:
    "font-poppins font-medium text-base text-white hover:text-dim-white px-5 py-3 hover:bg-site-dim2 cursor-pointer",

  // Exchange
  actionButton:
    "border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px]",
  message: "font-poppins font-lg text-white font-bold mt-7",

  // WalletButton
  walletButton:
    "transition delay-150 duration-300 ease-in-out bg-site-black border-none outline-none px-6 py-2 font-poppins font-bold text-lg text-white rounded-3xl leading-[24px] hover:bg-orange-800 ;",

  // loader
  loader: "flex justify-center items-center flex-col w-full min-h-full",
  loaderImg: "w-56 h-56 object-contain",
  loaderText:
    "font-poppins font-normal text-dim-white text-lg text-center mt-10",

  // balance
  balance: "w-full text-left mt-2 ml-2",
  balanceText: "font-poppins font-normal text-dim-white",
  balanceBold: "font-semibold text-white",
};

export default styles;
