import React, { Component } from "react";
import "./Graphs.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Jumbotron,
  Button
} from "reactstrap";

import C3Chart from "react-c3js";
import "c3/c3.css";

const axis = {
  x: {
    type: "timeseries",
    tick: {
      format: "%Y-%m-%d %H:%M:%S"
    }
  }
};

const zoom = {
  enabled: true,
  extent: [1, 100]
};

class Graphs extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedCoin: "No Coin Selected",
      data: {
        x: "x",
        columns: [],
        xFormat: "%Y-%m-%d %H:%M:%S"
      }
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  select(e, coinType) {
    this.setState({ data: {} });
    fetch(`/api/history/${coinType.toLowerCase()}`)
      .then(res => res.json())
      .then(coinHistory => {
        console.log(coinHistory);
        let timeColumn = ["x"];
        let krakenPrices = ["kraken"];
        let poloniexPrices = ["poloniex"];
        let coinCapPrices = ["coincap"];

        for (let coinInfo of coinHistory) {
          if (!timeColumn.includes(coinInfo.datetime))
            timeColumn.push(coinInfo.datetime);

          switch (coinInfo.exchange) {
            case "kraken":
              krakenPrices.push(coinInfo.price);
              break;
            case "poloniex":
              poloniexPrices.push(coinInfo.price);
              break;
            case "coincap":
              coinCapPrices.push(coinInfo.price);
              break;
            default:
              break;
          }
        }

        return this.setState({
          selectedCoin: coinType,
          dropdownOpen: false,
          data: {
            x: "x",
            columns: [timeColumn, krakenPrices, poloniexPrices, coinCapPrices],
            xFormat: "%Y-%m-%d %H:%M:%S"
          }
        });
      });
  }
  render() {
    return (
      <div className="container bg-light mt-5 p-2">
        {/* <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">
            This is a simple hero unit, a simple Jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
        
          <p className="lead">
            <Button color="success">Select A Coin</Button>
          </p>
        </Jumbotron> */}
        <h1 className="text-muted text-center pb-1">
          Exchange History
          <Dropdown
            isOpen={this.state.dropdownOpen}
            className="pt-2 pb-2 left"
            toggle={this.toggle}
          >
            <DropdownToggle color="success" caret>
              Select a Coin
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Coins</DropdownItem>
              <DropdownItem onClick={e => this.select(e, "Bitcoin")}>
                Bitcoin
              </DropdownItem>
              <DropdownItem onClick={e => this.select(e, "Ethereum")}>
                Ethereum
              </DropdownItem>
              <DropdownItem onClick={e => this.select(e, "Dash")}>
                Dash
              </DropdownItem>
              <DropdownItem onClick={e => this.select(e, "LiteCoin")}>
                LiteCoin
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </h1>

        <div className="shadow p-3 text-center">
          <h3 className="text-center p-2 bg-info text-white">
            {this.state.selectedCoin}
          </h3>
          <C3Chart data={this.state.data} axis={axis} zoom={zoom} />
        </div>
      </div>
    );
  }
}

export default Graphs;
