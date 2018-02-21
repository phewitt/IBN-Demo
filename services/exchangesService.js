const axios = require("axios");

module.exports.getKrakenPrices = async () => {
  let usdAssetPairs = [
    { name: "bitcoin", pair: "XXBTZUSD" },
    { name: "dash", pair: "DASHUSD" },
    { name: "ethereum", pair: "XETHZUSD" },
    { name: "litecoin", pair: "XLTCZUSD" }
  ];
  let prices = [];
  await Promise.all(
    usdAssetPairs.map(async object => {
      try {
        let response = await axios.get(
          `https://api.kraken.com/0/public/Ticker?pair=${object.pair}`
        );
        prices.push({
          name: object.name,
          price: +response.data.result[object.pair].a[0],
          exchange: "kraken"
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
  return prices;
};

module.exports.getPoloniexPrices = async () => {
  let usdAssetPairs = [
    { name: "bitcoin", pair: "USDT_BTC" },
    { name: "dash", pair: "USDT_DASH" },
    { name: "ethereum", pair: "USDT_ETH" },
    { name: "litecoin", pair: "USDT_LTC" }
  ];
  let prices = [];

  try {
    let response = await axios.get(
      "https://poloniex.com/public?command=returnTicker"
    );
    usdAssetPairs.forEach(object => {
      prices.push({
        name: object.name,
        price: +response.data[object.pair].lowestAsk,
        exchange: "poloniex"
      });
    });
  } catch (err) {
    console.log(err);
  }

  return prices;
};

module.exports.getCoinCapPrices = async () => {
  let usdAssetPairs = [
    { name: "bitcoin", pair: "BTC" },
    { name: "dash", pair: "DASH" },
    { name: "ethereum", pair: "ETH" },
    { name: "litecoin", pair: "LTC" }
  ];
  let prices = [];

  await Promise.all(
    usdAssetPairs.map(async object => {
      try {
        let response = await axios.get(`http://coincap.io/page/${object.pair}`);
        prices.push({
          name: object.name,
          price: response.data.price,
          exchange: "coincap"
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
  return prices;
};
