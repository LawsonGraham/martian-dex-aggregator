export default async function getCoins() {
  const res = await fetch(
    `https://open-api.openocean.finance/v3/aptos/tokenList`
  ).then(async (res) => {
    const response = await res.json();
    if (response) {
      return response.data;
    } else {
      return;
    }
  });
  console.log(res);

  let thl_coins = [
    {
      customAddress: `0x6f986d146e4a90b828d8c12c14b6f4e003fdff11a8eecceceb63744363eaac01::mod_coin::MOD`,
      symbol: "MOD",
      name: "Move Dollar",
      coinGeckoName: "usd-coin",
      decimals: 8,
      icon: "../assets/TokenMod.svg",
    },
    {
      customAddress: `0x7fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL`,
      symbol: "THL",
      name: "Thala Token",
      decimals: 8,
      icon: "../assets/TokenThl.svg",
      coinGeckoName: "thala",
    },
  ];
  for (let i = 0; i < thl_coins.length; i++) {
    res.push(thl_coins[i]);
  }
  console.log(res);
  return res;
}
