import React, { Component } from 'react';

import './board.css';

import Square from '../Square/square';

export default class Board extends Component {
  renderSquare(row, col) {
    const value = col + (row * 3);
    const winner = this.props.winningMove.includes(value);
    return (
      <Square
        value={this.props.squares[value]}
        onClick={() => this.props.onClick(row, col)}
        key={value}
        winner={winner}
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
