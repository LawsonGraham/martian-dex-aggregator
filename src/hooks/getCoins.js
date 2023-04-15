export default async function getCoins() {
    console.log('sadsaf')
    const res = await fetch(
      `https://open-api.openocean.finance/v3/aptos/tokenList`
    ).then( async (res) => 
    {
        console.log('dfd')
      const response = await res.json();
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
    console.log(res)
    return res;
  };