import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ExchangePriceTable from "./components/exchange-price-table/ExchangePriceTable";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Graphs from "./components/graphs/Graphs";


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ExchangePriceTable} />
            <Route exact path="/graphs" component={Graphs} />        
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
