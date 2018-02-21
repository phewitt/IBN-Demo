import React, { Component } from "react";
import "./ExchangePriceTable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

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
      <div className="container">
        <ReactTable
          data={this.state.coinInfo}
          columns={[
            {
              Header: "Pricing Table",
              columns: [
                {
                  Header: "Exchange",
                  accessor: "exchange"
                },
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Price",
                  accessor: "price"
                }
              ]
            }
          ]}
          defaultPageSize={15}
          className="-striped mx-auto justify-content-center"
        />
      </div>
    );
  }
}

export default ExchangePriceTable;
