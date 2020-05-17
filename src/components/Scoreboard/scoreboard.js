import React, { Component } from 'react';
import './scoreboard.css';

export default class Scoreboard extends Component {
  render() {
    const score = Object.entries(this.props.score);
    return (
      <ul className="score-board">
        {score.map(item => (
          <li key={item[0]}>{item[0]}: {item[1]}</li>
        ))}
      </ul>
    );
  }
}

