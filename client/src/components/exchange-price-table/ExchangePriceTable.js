import React, { Component } from "react";
import "./ExchangePriceTable.css";
import ReactTable from "react-table";
import { Button } from 'reactstrap';
import "react-table/react-table.css";

class ExchangePriceTable extends Component {
  constructor() {
    super();
    this.state = {
      coinInfo: [],
      filtered: []
    };
    this.getCoinInfo = this.getCoinInfo.bind(this);
  }

  componentDidMount() {
    this.getCoinInfo();
  }

  getCoinInfo() {
    this.setState({coinInfo:[]});
    fetch("/api/ask-prices")
      .then(res => res.json())
      .then(coinInfo =>
        this.setState({ coinInfo }, () =>
          console.log("coinInfo Fetched...", this.coinInfo)
        )
      );
  }

  render() {
    return (
      <div className="container mt-5">
        <ReactTable
          data={this.state.coinInfo}
          noDataText="Loading..."
          columns={[
            {
              Header: "Exchange Info",
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
                  accessor: "price"
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
        <Button color="success" className="mb-2 w-100" size="lg"  onClick={this.getCoinInfo}>Refresh</Button>        
      </div>
    );
  }
}

export default ExchangePriceTable;
