import React from 'react'

export default function Hangman({ wrong }) {
  return (
    <svg viewBox="0 0 200 250" className="hangman-svg">
      <line x1="10" y1="230" x2="190" y2="230" strokeWidth="4" stroke="#333" />
      <line x1="50" y1="230" x2="50" y2="20" strokeWidth="4" stroke="#333" />
      <line x1="50" y1="20" x2="140" y2="20" strokeWidth="4" stroke="#333" />
      <line x1="140" y1="20" x2="140" y2="45" strokeWidth="3" stroke="#333" />

      {wrong > 0 && <circle cx="140" cy="65" r="18" strokeWidth="3" stroke="#333" fill="transparent" />}
      {wrong > 1 && <line x1="140" y1="83" x2="140" y2="140" strokeWidth="3" stroke="#333" />}
      {wrong > 2 && <line x1="140" y1="95" x2="115" y2="115" strokeWidth="3" stroke="#333" />}
      {wrong > 3 && <line x1="140" y1="95" x2="165" y2="115" strokeWidth="3" stroke="#333" />}
      {wrong > 4 && <line x1="140" y1="140" x2="120" y2="180" strokeWidth="3" stroke="#333" />}
      {wrong > 5 && <line x1="140" y1="140" x2="160" y2="180" strokeWidth="3" stroke="#333" />}
    </svg>
  )
}