import React, { Component } from "react";
import "./ExchangePriceTable.css";
import ReactTable from "react-table";
import { Button } from "reactstrap";
import "react-table/react-table.css";

class ExchangePriceTable extends Component {
  constructor() {
    super();
    this.state = {
      coinInfo: [],
      filtered: [],
      lowestPrices: []
    };
    this.getCoinInfo = this.getCoinInfo.bind(this);
  }

  componentDidMount() {
    this.getCoinInfo();
  }

  getCoinInfo() {
    this.setState({ coinInfo: [] });
    fetch("/api/ask-prices")
      .then(res => res.json())
      .then(coinInfo => {
        let coinTypes = [];
        let lowestPrices = [];
        coinInfo.forEach(element => {
          coinTypes.push(element.name);
        });
        coinTypes = new Set(coinTypes);
        coinTypes.forEach(coinType => {
          let coinPrices = coinInfo.filter(obj => obj.name === coinType);
          let minPrice = coinPrices.reduce(
            (min, coin) => (coin.price < min ? coin.price : min),
            coinPrices[0].price
          );
          lowestPrices.push(minPrice);
        });
        return this.setState({ coinInfo, lowestPrices });
      });
  }

  render() {
    return (
      <div className="container text-center bg-light mt-5 p-2">
        <h1 className="text-muted pb-1">Exchange Pricing</h1>
        <ReactTable
          data={this.state.coinInfo}
          noDataText="Searching Exchanges..."
          columns={[
            {
              columns: [
                {
                  Header: "Exchange",
                  accessor: "exchange"
                },
                {
                  Header: "Coin Name",
                  accessor: "name"
                },
                {
                  Header: "Price",
                  accessor: "price",
                  Cell: row => {
                    return (
                      <span>
                        <span
                          style={{
                            color: this.state.lowestPrices.includes(row.value)
                              ? "#57d500"
                              : "#ff2e00",
                            transition: "all .3s ease"
                          }}
                        >
                          &#x25cf;
                        </span>{" "}
                        {row.value}
                      </span>
                    );
                  }
                }
              ]
            }
          ]}
          defaultSorted={[
            {
              id: "price",
              desc: false
            }
          ]}
          filterable
          defaultPageSize={10}
          className="-striped"
          filtered={this.state.filtered}
          onFilteredChange={filtered => this.setState({ filtered })}
        />
        <Button
          color="success"
          className="mb-2 w-100"
          size="lg"
          onClick={this.getCoinInfo}
        >
          Refresh
        </Button>
      </div>
    );
  }
}

export default ExchangePriceTable;
