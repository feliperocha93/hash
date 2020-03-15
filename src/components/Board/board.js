import React, { Component } from 'react';

import'./board.css';

import Square from '../Square/square';

export default class Board extends Component {
  renderSquare(square) {
    return (
      <Square
        value={this.props.squares[square]}
        onClick={() => this.props.onClick(square)}
      />
    )
  }

  renderRow(row) {
    let squares = [0, 1, 2];
    return (
      <div className="board-row">
        {squares.map(square => this.renderSquare(row + (square * 3)))}
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
