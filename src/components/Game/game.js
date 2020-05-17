import React, { Component } from 'react';

import Board from '../Board/board';
// import HistoryButton from '../HistoryButton/historyButton';
import Scoreboard from '../Scoreboard/scoreboard';
import Info from '../Info';
// import History from '../History';
import Footer from '../Footer';

import './game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        location: Array(2).fill(null),
        squares: Array(9).fill(null)
      }],
      draw: 0,
      winO: 0,
      winX: 0,
      historyOrder: 'ASC',
      stepNumber: 0,
      xIsNext: true,
      endMessage: true,
      winner: null,
      winnerMove: [],
      isGaming: true
    };
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
        this.setState({ winnerMove: [a, b, c] })
        return true;
      }
    }
    return null;
  }

  handleClick = (row, col) => {
    const { winner, xIsNext, winO, winX, stepNumber } = this.state;

    if (winner) return;

    if (stepNumber === 8) this.setState({
      isGaming: false,
      endMessage: 'Game Draw!',
      draw: this.state.draw + 1
    })

    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let i = col + (row * 3);

    if (squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';

    if (this.calculateWinner(squares)) {
      const winner = xIsNext ? 'X' : 'O';
      const placar = winner === 'X' ? winX + 1 : winO + 1;

      if (window.innerWidth > 1024) window.scrollTo({ top: 100, behavior: "smooth" });

      this.setState({
        isGaming: false,
        endMessage: `Winner is ${winner}`,
        winner,
        [`win${winner}`]: placar
      });
    }

    this.setState({
      history: history.concat([{
        squares,
        location: [row, col]
      }]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
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

  newGame() {
    this.setState({
      history: [{
        location: Array(2).fill(null),
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      endMessage: true,
      winner: null,
      winnerMove: [],
      isGaming: true
    })
  }

  render() {
    const {
      history, endMessage, isGaming, xIsNext, winnerMove, draw, winX, winO
    } = this.state;
    const current = history[this.state.stepNumber];

    // const moves = history.map((step, move) => {
    //   const [row, col] = step.location;
    //   const desc = move ?
    //     `Go to move ${move} (col:${col + 1}, row:${row + 1})` :
    //     null;
    //   return (
    //     <HistoryButton
    //       key={move}
    //       desc={desc}
    //       onClick={() => this.jumpTo(move)}
    //     />
    //   )
    // });
    // const movesView = moves.sort((a, b) => {
    //   return this.state.historyOrder === 'ASC' ?
    //     a.key > b.key ? 1 : -1 :
    //     a.key < b.key ? 1 : -1;
    // });

    const status = isGaming ? `${xIsNext === true ? 'X' : 'O'}` : endMessage;

    return (
      <>
        <div className="game">
          <h1>REACT HASH</h1>

          <Board
            className="game-board"
            squares={current.squares}
            onClick={(row, col) => this.handleClick(row, col)}
            winningMove={winnerMove}
          />

          <Info
            className="game-info"
            status={status}
          />

          <Scoreboard
            score={{ draw, winX, winO }}
          />

          <button
            className="new-game btn"
            onClick={() => this.newGame()}
          >
            RESTART GAME
          </button>

          {/* <History
            className="game-history"
            historyOrder={this.state.historyOrder}
            sortHistory={() => this.sortHistory()}
            movesView={movesView}
          /> */}

        </div>
        <Footer />
      </>
    );
  }
}
