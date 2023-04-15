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
    return res;
  };