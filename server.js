const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/ask-prices", async (req, res) => {
  allAskPrices = [];
  krakenAskPrices = await getKrakenPrices();
  poloniexAskPrices = await getPoloniexPrices();

  allAskPrices = allAskPrices.concat(krakenAskPrices, poloniexAskPrices);
  res.send(allAskPrices);
});

async function getKrakenPrices() {
  let KrakenUSDAssetPairs = [
    { name: "bitcoin", pair: "XXBTZUSD" },
    { name: "dash", pair: "DASHUSD" },
    { name: "ethereum", pair: "XETHZUSD" },
    { name: "litecoin", pair: "XLTCZUSD" }
  ];
  let prices = [];
  await Promise.all(
    KrakenUSDAssetPairs.map(async object => {
      try {
        let response = await axios.get(
          `https://api.kraken.com/0/public/Ticker?pair=${object.pair}`
        );
        prices.push({
          name: object.name,
          price: response.data.result[object.pair].a[0],
          exchange: "kraken"
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
  return prices;
}

async function getPoloniexPrices() {
  poloniexUSDAssetPairs = [
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
    poloniexUSDAssetPairs.forEach(object => {
      prices.push({
        name: object.name,
        price: response.data[object.pair].lowestAsk,
        exchange: "poloniex"
      });
    });
  } catch (err) {
    console.log(err);
  }

  return prices;
}

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
