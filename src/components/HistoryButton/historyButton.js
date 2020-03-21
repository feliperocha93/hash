import React from 'react';
import './historyButton.css';

const HistoryButton = (props) => {
  return (
    <li>
      <button onClick={props.onClick}>
        {props.desc}
      </button>
    </li>
  )
};

export default HistoryButton;
