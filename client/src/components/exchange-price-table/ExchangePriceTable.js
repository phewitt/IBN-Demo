import React, { Component } from "react";
import "./ExchangePriceTable.css";
import ReactTable from 'react-table';

class ExchangePriceTable extends Component {
  constructor() {
    super();
    this.state = {
      coinInfo: []
    };
  }

  componentDidMount() {
    fetch("/api/ask-prices")
      .then(res => res.json())
      .then(coinInfo =>
        this.setState({ coinInfo }, () =>
          console.log("coinInfo Fetched...", coinInfo)

        )
      );
  }

  render() {
    return (
      <div>
        <h2>Coins</h2>
        <ul>
          {this.state.coinInfo.map((coinInfo, index) => {
            return (
              <li key={index}>
                {coinInfo.name} {coinInfo.price} {coinInfo.exchange}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ExchangePriceTable;
