export default async function getCoins() {
    const res = await fetch(
      `https://open-api.openocean.finance/v3/aptos/tokenList`
    ).then( async (res) => 
    {
      const response = await res.json();
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
    console.log(res)

    let thl_coins = [
        {
            customAddress: `0x6f986d146e4a90b828d8c12c14b6f4e003fdff11a8eecceceb63744363eaac01::mod_coin::MOD`,
            symbol: "MOD",
            name: "Move Dollar",
            coinGeckoName: "usd-coin",
            decimals: 8,
            icon: "TokenMod",
        },
        {
            customAddress: `0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH`,
            symbol: "zWETH",
            name: "Wrapped Ether (LayerZero)",
            coinGeckoName: "ethereum",
            decimals: 6,
            icon: "TokenWeth",
        },
        {
            customAddress: `0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC`,
  symbol: "zUSDC",
  name: "USD Coin (LayerZero)",
  coinGeckoName: "usd-coin",
  decimals: 6,
  icon: "TokenUsdc",
        },
        {
            customAddress: `0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT`,
  symbol: "zUSDT",
  name: "USD Tether (LayerZero)",
  coinGeckoName: "tether",
  decimals: 6,
  icon: "TokenUsdt",
        },
        {
            customAddress: `0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb::coin::T`,
  symbol: "whWETH",
  name: "Wrapped Ether (Wormhole)",
  coinGeckoName: "ethereum",
  decimals: 6,
  icon: "TokenWeth",
        },
        {
            customAddress: `0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T`,
  symbol: "whUSDC",
  name: "USD Coin (Wormhole)",
  coinGeckoName: "usd-coin",
  decimals: 6,
  icon: "TokenUsdc",
        },
        {
            customAddress: `0x7fd500c11216f0fe3095d0c4b8aa4d64a4e2e04f83758462f2b127255643615::thl_coin::THL`,
  symbol: "THL",
  name: "Thala Token",
  decimals: 8,
  icon: "TokenThl",
  coinGeckoName: "thala",
        }]
    for (let i = 0; i < thl_coins.length; i++) {
            res.push(thl_coins[i])
        }
    console.log(res)
    return res;
  };