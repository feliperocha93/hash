import React, { Component } from 'react';

import Board from '../Board/board';
import HistoryButton from '../HistoryButton/historyButton';
import Scoreboard from '../Scoreboard/scoreboard';

import './game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: null,
      history: [{
        location: Array(2).fill(null),
        squares: Array(9).fill(null)
      }],
      scoreboard: {
        D: 0,
        O: 0,
        X: 0
      },
      historyOrder: 'ASC',
      stepNumber: 0,
      xIsNext: true,
    };
  }

  async componentDidMount() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    if (history.length > 5 && history.length <= 9) {
      return await this.setState({ "gameStatus": this.calculateWinner(current.squares) })
    }
    else if (history.length === 10) {
      return await this.setState({
        "gameStatus": this.calculateWinner(current.squares) ?
          this.calculateWinner(current.squares) :
          { letter: 'D', result: `Game draw!`, winningMove: [] }
      });
    }
  }

  updateScore(letter) {
    this.setState({
      scoreboard: {
        ...this.state.scoreboard,
        letter: `this.state.scoreboard.${letter}` + 1
      }
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          "result": `Winner: ${squares[a]}`,
          "winningMove": lines[i]
        };
      }
    }
    return null;
  }

  handleClick = (row, col) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let i = col + (row * 3);
    if (this.calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        location: [row, col]
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  sortHistory() {
    let historyOrder = this.state.historyOrder === 'ASC' ? 'DEC' : 'ASC';
    this.setState({ historyOrder });
  }

  // updateGameStatus(history, current) {
  //   if (history.length > 5 && history.length <= 9) {
  //     return this.calculateWinner(current.squares)
  //   }
  //   else if (history.length === 10) {
  //     return (
  //       this.calculateWinner(current.squares) ?
  //         this.calculateWinner(current.squares) :
  //         { letter: 'D', result: `Game draw!`, winningMove: [] }
  //     );
  //   }
  // }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // let gameStatus = this.updateGameStatus(history, current);

    let gameStatus = this.state.gameStatus;

    const status = gameStatus ?
      gameStatus.result :
      'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    const winningMove = gameStatus ?
      gameStatus.winningMove : [];

    const moves = history.map((step, move) => {
      const [row, col] = step.location;
      const desc = move ?
        `Go to move ${move} (col:${col + 1}, row:${row + 1})` :
        `Go to move start`;
      return (
        <HistoryButton
          key={move}
          desc={desc}
          onClick={() => this.jumpTo(move)}
        />
      )
    });
    const movesView = moves.sort((a, b) => {
      return this.state.historyOrder === 'ASC' ?
        a.key > b.key ? 1 : -1 :
        a.key < b.key ? 1 : -1;
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(row, col) => this.handleClick(row, col)}
            winningMove={winningMove}
          />
        </div>
        <div className="game-info">
          <div >{status}</div>
        </div>
        <div className="game-history">
          <button
            onClick={() => this.sortHistory()}
            disabled={this.state.historyOrder === 'ASC'}>
            ASC
            </button>
          <button
            onClick={() => this.sortHistory()}
            disabled={this.state.historyOrder === 'DEC'}>
            DEC
            </button>
          <ol>{movesView}</ol>
        </div>
        <div className="game-score">
          <Scoreboard
            score={this.state.scoreboard}
          />
        </div>
      </div>
    );
  }
}
