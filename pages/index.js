import React, { useEffect, useState } from 'react'
import Hangman from '../components/Hangman'
import { randomWord } from '../lib/words'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const MAX_WRONG = 6

export default function Home() {
  const [word, setWord] = useState('')
  const [guessed, setGuessed] = useState([])
  const [wrong, setWrong] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('playing')

  useEffect(() => startNewGame(), [])

  function startNewGame() {
    const w = randomWord()
    setWord(w)
    setGuessed([])
    setWrong(0)
    setInput('')
    setStatus('playing')
  }

  function normalizeLetter(l) {
    return (l || '').toUpperCase().trim().slice(0,1)
  }

  function handleGuess(letter) {
    if (status !== 'playing') return
    const L = normalizeLetter(letter)
    if (!L || guessed.includes(L)) return
    const newGuessed = [...guessed, L]
    setGuessed(newGuessed)

    if (!word.includes(L)) {
      const newWrong = wrong + 1
      setWrong(newWrong)
      if (newWrong >= MAX_WRONG) {
        setStatus('lost')
      }
    } else {
      const lettersInWord = Array.from(new Set(word.split('')))
      const allFound = lettersInWord.every(ch => newGuessed.includes(ch))
      if (allFound) setStatus('won')
    }
    setInput('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!input) return
    handleGuess(input)
  }

  const displayed = word.split('').map((ch, i) => (guessed.includes(ch) ? ch : '_'))

  return (
    <div className="page">
      <header>
        <h1>Jogo da Forca Prog Web</h1>
        <p className="subtitle">Adivinhe a palavra antes que o boneco seja completado</p>
      </header>

      <main className="game-container">
        <section className="left">
          <Hangman wrong={wrong} />
          <div className="word">
            {displayed.map((c, i) => (
              <span key={i} className="letter">{c}</span>
            ))}
          </div>

          <div className="status-row">
            <p>Tentativas restantes: <strong>{MAX_WRONG - wrong}</strong></p>
            <button className="btn" onClick={startNewGame}>Reiniciar</button>
          </div>

          {status === 'won' && (
            <div className="message win">Parabéns! Você adivinhou: <strong>{word}</strong></div>
          )}

          {status === 'lost' && (
            <div className="message lose">Você perdeu! A palavra era: <strong>{word}</strong></div>
          )}
        </section>

        <aside className="right">
          <div className="input-box">
            <form onSubmit={handleSubmit}>
              <label htmlFor="letter">Digite uma letra</label>
              <div className="input-row">
                <input id="letter" value={input} onChange={e => setInput(e.target.value)} maxLength={1} />
                <button className="btn" type="submit">Enviar</button>
              </div>
            </form>
            <p className="hint">ou clique nas letras abaixo:</p>
          </div>

          <div className="keyboard">
            {ALPHABET.map(l => {
              const tried = guessed.includes(l)
              const correct = word.includes(l)
              return (
                <button
                  key={l}
                  className={`key ${tried ? (correct ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleGuess(l)}
                  disabled={tried || status !== 'playing'}
                >{l}</button>
              )
            })}
          </div>

          <div className="guessed-list">
            <h3>Letras tentadas</h3>
            <div className="letters">
              {guessed.length === 0 ? <span>--</span> : guessed.map(l => (
                <span key={l} className={word.includes(l) ? 'ok' : 'no'}>{l}</span>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <footer>
        <p>Reinicie para uma nova palavra aleatória</p>
      </footer>
    </div>
  )
}