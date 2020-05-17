import React from 'react';

import './styles.css';

function Info({ status }) {
  return (
    <div className="game-info">
      <div>{status}</div>
    </div>
  )
}

export default Info;