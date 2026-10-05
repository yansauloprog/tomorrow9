import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const people = [
  { name: 'Yasmin', kind: 'pending' },
  { name: 'Cecílya', kind: 'pending' },
  { name: 'Beatriz', kind: 'pending' },
  { name: 'Lucas', kind: 'pending' },
  { name: 'Ramayana', kind: 'pending' },
  { name: 'Marquinhos', kind: 'pending' },
  {
    name: 'Tio Paniagua & Tia Fátima',
    kind: 'text',
    text: 'Minha querida Thayná, nesta data, a emoção tomava conta de todos e, naquele momento, você chegava para dar alegria e emoção a todos que te esperavam.\n\nSua infância e suas peripécias ficaram gravadas em nossa mente como aquela menininha tão amável, sorridente e alegre.\n\nVocê foi crescendo, debutou, e nós sempre vibrando pela sua vitória e seu sucesso.\n\nE, contudo, o tempo está passando.\n\nO tempo não para e não espera. Siga em frente, galgue tudo que você tem em sua mente, que a família estará sempre junto de você para te ajudar.\n\nAgora, hoje, neste dia, ele é todo seu.\n\nViva na certeza da sua felicidade.\n\nVocê, nos seus dezoito anos, tem o controle de sua vida e dela você será capaz de dominar o seu sucesso.\n\nAssim como nós estamos felizes, você também está muito irradiante de felicidade.\n\nNossos parabéns! Seja feliz. Deus te abençoe sempre.\n\nFelicidades em suas 18 primaveras.'
  }
]

const VerticalCutReveal = forwardRef(function VerticalCutReveal(
  {
    children,
    reverse = false,
    splitBy = 'words',
    staggerDuration = 0.2,
    staggerFrom = 'first',
    transition = { type: 'spring', stiffness: 190, damping: 22 },
    className = '',
    autoStart = true,
    onComplete
  },
  ref
) {
  const text = typeof children === 'string' ? children : String(children || '')
  const [isAnimating, setIsAnimating] = useState(false)

  const splitIntoCharacters = (value) => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' })
      return Array.from(segmenter.segment(value), ({ segment }) => segment)
    }
    return Array.from(value)
  }

  const elements = useMemo(() => {
    const words = text.split(' ')
    if (splitBy === 'characters') {
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }))
    }

    const parts =
      splitBy === 'words'
        ? text.split(' ')
        : splitBy === 'lines'
          ? text.split('\n')
          : text.split(splitBy)

    return parts.map((part, i) => ({
      characters: [part],
      needsSpace: i !== parts.length - 1
    }))
  }, [text, splitBy])

  const getStaggerDelay = useCallback((index) => {
    const total = elements.reduce(
      (sum, word) => sum + word.characters.length + (word.needsSpace ? 1 : 0),
      0
    )

    if (staggerFrom === 'first') return index * staggerDuration
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration
    if (staggerFrom === 'center') {
      const center = Math.floor(total / 2)
      return Math.abs(center - index) * staggerDuration
    }
    if (typeof staggerFrom === 'number') {
      return Math.abs(staggerFrom - index) * staggerDuration
    }

    return index * staggerDuration
  }, [elements, staggerDuration, staggerFrom])

  const startAnimation = useCallback(() => setIsAnimating(true), [])

  useImperativeHandle(ref, () => ({
    startAnimation,
    reset: () => setIsAnimating(false)
  }))

  useEffect(() => {
    if (autoStart) startAnimation()
  }, [autoStart, startAnimation])

  const variants = {
    hidden: { y: reverse ? '-100%' : '100%' },
    visible: (i) => ({
      y: 0,
      transition: {
        ...transition,
        delay: (transition.delay || 0) + getStaggerDelay(i)
      }
    })
  }

  let passed = 0

  return (
    <span className={'cutReveal ' + className}>
      <span className="srOnly">{text}</span>

      {elements.map((word, wordIndex) => {
        const base = passed
        passed += word.characters.length

        return (
          <span className="cutWord" aria-hidden="true" key={wordIndex}>
            {word.characters.map((char, charIndex) => (
              <span className="cutChar" key={charIndex}>
                <motion.span
                  custom={base + charIndex}
                  initial="hidden"
                  animate={isAnimating ? 'visible' : 'hidden'}
                  variants={variants}
                  onAnimationComplete={
                    wordIndex === elements.length - 1 &&
                    charIndex === word.characters.length - 1
                      ? onComplete
                      : undefined
                  }
                >
                  {char}
                </motion.span>
              </span>
            ))}

            {word.needsSpace && <span>&nbsp;</span>}
          </span>
        )
      })}
    </span>
  )
})

function RevealText({ children, delay = 0, inverse = false, small = false }) {
  return (
    <VerticalCutReveal
      splitBy="characters"
      staggerDuration={0.025}
      staggerFrom="first"
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 21,
        delay
      }}
      className={
        'revealText' +
        (inverse ? ' inverse' : '') +
        (small ? ' small' : '')
      }
    >
      {children}
    </VerticalCutReveal>
  )
}

function Button({ children, onClick, inverse = false }) {
  return (
    <motion.button
      className={'actionButton' + (inverse ? ' inverse' : '')}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.35 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </motion.button>
  )
}

const introScreens = [
  {
    lines: ['Oi, amor.', 'Achou que a carta tinha acabado?'],
    button: 'continuar'
  },
  {
    lines: ['Eu poderia continuar falando sobre você por horas.', 'Só que aparentemente eu não sou o único.'],
    button: 'continuar'
  },
  {
    lines: ['Então eu convoquei reforços.'],
    button: 'quero ver'
  }
]

function CenteredTextScreen({ lines, button, onNext, dark = false }) {
  return (
    <motion.section
      className={'centeredScreen' + (dark ? ' dark' : '')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32 }}
    >
      <div className="centeredMessage">
        {lines.map((line, index) => (
          <RevealText
            key={line}
            delay={index * 0.35}
            inverse={dark}
            small={line.length > 46}
          >
            {line}
          </RevealText>
        ))}
      </div>

      {button && (
        <div className="centeredButton">
          <Button onClick={onNext} inverse={dark}>{button}</Button>
        </div>
      )}
    </motion.section>
  )
}

function PendingMedia({ person }) {
  return (
    <motion.div
      className="pendingMedia"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span>mídia de {person.name}</span>
    </motion.div>
  )
}

function PersonScreen({ person, index, next }) {
  return (
    <motion.section
      className="personScreen"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.32 }}
    >
      <header className="personHeader">
        <RevealText small>{person.name}</RevealText>
      </header>

      <div className={'mediaArea' + (person.kind === 'text' ? ' textMedia' : '')}>
        {person.kind === 'text' ? (
          <motion.article
            className="textMessage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <p>{person.text}</p>
          </motion.article>
        ) : (
          <PendingMedia person={person} />
        )}
      </div>

      <div className="personButton">
        <Button onClick={next}>
          {index === people.length - 1 ? 'continuar' : 'próximo'}
        </Button>
      </div>
    </motion.section>
  )
}

function App() {
  const [phase, setPhase] = useState('intro')
  const [introIndex, setIntroIndex] = useState(0)
  const [personIndex, setPersonIndex] = useState(0)

  const nextIntro = () => {
    if (introIndex < introScreens.length - 1) {
      setIntroIndex((current) => current + 1)
      return
    }

    setPhase('people')
  }

  const nextPerson = () => {
    if (personIndex === 3) {
      setPersonIndex(4)
      setPhase('family')
      return
    }

    if (personIndex < people.length - 1) {
      setPersonIndex((current) => current + 1)
      return
    }

    setPhase('ending')
  }

  return (
    <main className="app">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <CenteredTextScreen
            key={'intro-' + introIndex}
            lines={introScreens[introIndex].lines}
            button={introScreens[introIndex].button}
            onNext={nextIntro}
          />
        )}

        {phase === 'people' && (
          <PersonScreen
            key={'person-' + personIndex}
            person={people[personIndex]}
            index={personIndex}
            next={nextPerson}
          />
        )}

        {phase === 'family' && (
          <CenteredTextScreen
            key="family"
            lines={['Agora a coisa ficou séria.', 'Família.']}
            button="continuar"
            onNext={() => setPhase('people')}
            dark
          />
        )}

        {phase === 'ending' && (
          <CenteredTextScreen
            key="ending"
            lines={['Pronto.', 'Todo mundo já falou.', '...quer dizer.', 'Quase todo mundo.']}
            button="continuar comigo"
            onNext={() => setPhase('finale')}
            dark
          />
        )}

        {phase === 'finale' && (
          <CenteredTextScreen
            key="finale"
            lines={['Agora falta eu.', 'Feliz aniversário, meu amor.']}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
