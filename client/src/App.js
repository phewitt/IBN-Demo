import React, { Component } from "react";
import "./App.css";
import ExchangePriceTable from "./components/exchange-price-table/ExchangePriceTable";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ExchangePriceTable />
        <Footer />
      </div>
    );
  }
}

export default App;
