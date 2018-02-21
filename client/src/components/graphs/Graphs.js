import React, { Component } from "react";
import "./Graphs.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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

class Graphs extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedCoin: "bitcoin",
      data: {
        x: "x",
        columns: [
          [
            "x",
            "2017-01-01 12:10:00",
            "2017-01-02 05:00:00",
            "2017-01-03 03:00:00",
            "2017-01-04 03:00:00",
            "2017-01-05 03:00:00",
            "2017-01-06 03:00:00"
          ],
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 130, 340, 200, 500, 250, 350]
        ],
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
    this.setState({
      selectedCoin: coinType,
      data: {
        x: "x",
        columns: [
          [
            "x",
            "2017-01-01 12:10:00",
            "2017-01-02 05:00:00",
            "2017-01-03 03:00:00",
            "2017-01-04 03:00:00",
            "2017-01-05 03:00:00",
            "2017-01-06 03:00:00"
          ],
          ["data1", 30, 200, 150, 4000, 150, 250],
          ["data2", 130, 340, 200, 500, 2530, 350]
        ]
      }
    });
  }
  render() {
    return (
      <div className="container">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          className="pt-2 pb-2"
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
        <div className="shadow p-3 text-center">
          <h3 className="text-center p-2 bg-secondary text-white">
            {this.state.selectedCoin}
          </h3>
          <h1>Kraken</h1>
          <C3Chart data={this.state.data} axis={axis} />
          <h1>Poloniex</h1>
          <C3Chart data={this.state.data} axis={axis} />
          <h1>CoinCap</h1>
          <C3Chart data={this.state.data} axis={axis} />
        </div>
      </div>
    );
  }
}

export default Graphs;
