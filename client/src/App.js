import React, { Component } from "react";
import "./App.css";
import ExchangePriceTable from "./components/exchange-price-table/ExchangePriceTable";
import Header from "./components/header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ExchangePriceTable />
      </div>
    );
  }
}

export default App;
