import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ExchangePriceTable from "./components/exchange-price-table/ExchangePriceTable";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ExchangePriceTable} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
