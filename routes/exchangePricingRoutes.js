const exchanges = require("../services/ExchangesService");
const firestore = require("../services/FirebaseService");

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
    await firestore.save(allAskPrices);
    res.send(allAskPrices);
  });

  app.get("/api/history/:coinType", async (req, res) => {
    const history = await firestore.getCoinHistory(req.params.coinType);
    res.send(history);
  });
};
