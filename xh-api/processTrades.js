const doProcessTrades = (tradeData) => {
  let confirmedTrades = {};
  let tradesRet = [];
  let count = 0;

  let faultyTradesToBeRemoved = [...tradeData]; //Should not directly manipulate input
  for (let individualTrade of faultyTradesToBeRemoved) {
    if (individualTrade.id == "00000000-0000-0000-0000-000000000000") {
      const { id, price, quantity, currency, symbol } = individualTrade;
      const badTrade = `Bad trade for symbol: ${symbol} with invalid id: ${id} for ${quantity} shares at ${currency} ${price}/share was removed.`;
      console.log(badTrade);
      faultyTradesToBeRemoved.splice(
        faultyTradesToBeRemoved.indexOf(individualTrade),
        1
      );
    }
  }

  const sanitizedTradeData = faultyTradesToBeRemoved; //once faultyTrades are spliced, iterate over remaining:
  for (let individualTrade of sanitizedTradeData) {
    let { currency, price, quantity, symbol, companyName } = individualTrade;
    let currencyTotal = "total" + currency;
    let priceAddedToCurrencyTotal = price * quantity;

    !confirmedTrades[currencyTotal]
      ? (confirmedTrades[currencyTotal] = priceAddedToCurrencyTotal)
      : (confirmedTrades[currencyTotal] += priceAddedToCurrencyTotal);

    if (!confirmedTrades.symbols) confirmedTrades.symbols = [];
    if (confirmedTrades.symbols.indexOf(symbol) < 0) {
      confirmedTrades.symbols = confirmedTrades.symbols.concat([symbol]);
    }
    if (!companyName) individualTrade["companyName"] = symbol;

    tradesRet = tradesRet.concat(individualTrade);
    count++;
  }

  confirmedTrades.tradeCount = count;
  confirmedTrades.trades = tradesRet;

  console.log(confirmedTrades); //if you would like a console output of the return value
  return confirmedTrades;
};

const data = [
  {
    id: "3cc51cfd-6e3c-41eb-9604-362da3a6fb64",
    symbol: "MSFT",
    companyName: "Microsoft",
    price: 310.98,
    quantity: 2000,
    currency: "USD",
  },
  {
    id: "0572be22-d790-460e-bf03-8ee1b3b19dad",
    symbol: "MSFT",
    companyName: "Microsoft",
    price: 310.9,
    quantity: 1500,
    currency: "USD",
  },
  {
    id: "8f356500-de35-4378-b7a3-5c587da54cd5",
    symbol: "AAPL",
    companyName: "Apple",
    price: 174.78,
    quantity: 500,
    currency: "USD",
  },
  {
    id: "5f92c4c3-b6b9-4538-9e80-d587217e8410",
    symbol: "VOD",
    price: 130.02,
    quantity: 3290,
    currency: "GBP",
  },
  {
    id: "00000000-0000-0000-0000-000000000000",
    symbol: "XXX",
    price: 99.99,
    quantity: 100,
    currency: "GBP",
  },
  {
    id: "155ac33b-05c4-42f7-a446-0b7ffacf2504",
    symbol: "VOD",
    companyName: undefined,
    price: 128.91,
    quantity: 8500,
    currency: "GBP",
  },
];

doProcessTrades(data);
