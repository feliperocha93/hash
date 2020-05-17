import React from 'react';

// import { Container } from './styles';

function History({ historyOrder, sortHistory, movesView }) {
  return (
    <div className="game-history">
      <button
        className='btn'
        onClick={sortHistory}
        disabled={historyOrder === 'ASC'}>
        ASC
        </button>
      <button
        className='btn'
        onClick={sortHistory}
        disabled={historyOrder === 'DEC'}>
        DEC
        </button>
      <ul>{movesView}</ul>
    </div>
  );
}

export default History;