import React, { Component } from 'react';
import './scoreboard.css';

export default class Scoreboard extends Component {
  render() {
    const score = Object.entries(this.props.score);
    return (
      <>
        <h3>Scoreboard</h3>
        <ul>
          {score.map(item => (
            <li key={item[0]}>{item[0]}: {item[1]}</li>
          ))}
        </ul>
      </>
    );
  }
}

