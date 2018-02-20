const exchanges = require("../services/exchangesService");

module.exports = app => {
  app.get("/api/ask-prices", async (req, res) => {
    allAskPrices = [];
    krakenAskPrices = await exchanges.getKrakenPrices();
    poloniexAskPrices = await exchanges.getPoloniexPrices();
    coincapPrices = await exchanges.getCoinCapPrices();
    allAskPrices = allAskPrices.concat(
      krakenAskPrices,
      poloniexAskPrices,
      coincapPrices
    );
    res.send(allAskPrices);
  });
};
