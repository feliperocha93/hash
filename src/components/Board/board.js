import React, { Component } from 'react';

import './board.css';

import Square from '../Square/square';

export default class Board extends Component {
  renderSquare(row, col) {
    let value = col + (row * 3);
    return (
      <Square
        value={this.props.squares[value]}
        onClick={() => this.props.onClick(row, col)}
        key={value}
      />
    )
  }

  renderRow(row) {
    let cols = [0, 1, 2];
    return (
      <div className="board-row" key={row}>
        {cols.map(col => this.renderSquare(row, col))}
      </div>
    )
  }

  render() {
    let rows = [0, 1, 2];
    return (
      <div>
        {rows.map(row => this.renderRow(row))}
      </div>
    );
  }
}
