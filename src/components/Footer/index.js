import React from 'react';
import { IoMdHeartHalf, IoLogoGithub } from 'react-icons/io';

import './styles.css';

function Footer() {
  return (
    <footer className="game-footer">
      <div>
        <span>Made with <IoMdHeartHalf size={20} color="#fff" /></span>
        <a href="https://github.com/feliperocha93/hash"><IoLogoGithub size={32} color='#fff' /></a>
      </div>
    </footer>
  )
}

export default Footer;