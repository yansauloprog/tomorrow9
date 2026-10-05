import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const people = [
  { name: 'Yasmin', relation: 'grande amiga', intro: 'Começando por alguém que provavelmente sabe coisa demais sobre você.', kind: 'pending' },
  { name: 'Cecílya', relation: 'amiga', intro: 'Mais uma pessoa que fez questão de aparecer por aqui.', kind: 'pending' },
  { name: 'Beatriz', relation: 'amiga', intro: 'Ela também tinha algumas coisas pra te dizer.', kind: 'pending' },
  { name: 'Lucas', relation: 'amigo', intro: 'Sim. Até esse cidadão entrou na operação.', kind: 'pending' },
  { name: 'Ramayana', relation: 'mãe', intro: 'Agora a coisa ficou séria. É a vez da sua mãe.', kind: 'pending' },
  { name: 'Marquinhos', relation: 'pai', intro: 'E claro que ele também não podia ficar de fora.', kind: 'pending' },
  {
    name: 'Tio Paniagua & Tia Fátima',
    relation: 'família de coração',
    intro: 'Algumas pessoas viram família muito antes de alguém precisar explicar o parentesco.',
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
    const parts = splitBy === 'words' ? text.split(' ') : splitBy === 'lines' ? text.split('\n') : text.split(splitBy)
    return parts.map((part, i) => ({ characters: [part], needsSpace: i !== parts.length - 1 }))
  }, [text, splitBy])

  const getStaggerDelay = useCallback((index) => {
    const total = elements.reduce((sum, word) => sum + word.characters.length + (word.needsSpace ? 1 : 0), 0)
    if (staggerFrom === 'first') return index * staggerDuration
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration
    if (staggerFrom === 'center') {
      const center = Math.floor(total / 2)
      return Math.abs(center - index) * staggerDuration
    }
    if (typeof staggerFrom === 'number') return Math.abs(staggerFrom - index) * staggerDuration
    return index * staggerDuration
  }, [elements, staggerDuration, staggerFrom])

  const startAnimation = useCallback(() => setIsAnimating(true), [])
  useImperativeHandle(ref, () => ({ startAnimation, reset: () => setIsAnimating(false) }))

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
                    wordIndex === elements.length - 1 && charIndex === word.characters.length - 1
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

const introScreens = [
  {
    eyebrow: '06.10.2026',
    lines: ['OI, AMOR.', 'ACHOU QUE A CARTA', 'TINHA ACABADO?'],
    button: 'acabou nada'
  },
  {
    eyebrow: 'pequeno detalhe',
    lines: ['EU PODERIA', 'CONTINUAR FALANDO', 'SOBRE VOCÊ POR HORAS.'],
    sub: 'Só que aparentemente eu não sou o único.',
    button: 'hmm…'
  },
  {
    eyebrow: 'operação: thayná',
    lines: ['ENTÃO EU', 'CONVOQUEI', 'REFORÇOS.'],
    sub: '8 pessoas. 7 recados. E algumas chances consideráveis de você chorar.',
    button: 'quero ver'
  }
]

function CutLine({ children, delay = 0, reverse = false }) {
  return (
    <VerticalCutReveal
      splitBy="characters"
      staggerDuration={0.025}
      staggerFrom="first"
      reverse={reverse}
      transition={{ type: 'spring', stiffness: 200, damping: 21, delay }}
      className="headline"
    >
      {children}
    </VerticalCutReveal>
  )
}

function Button({ children, onClick, light = false }) {
  return (
    <motion.button
      className={'actionButton ' + (light ? 'light' : '')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="arrow">→</span>
    </motion.button>
  )
}

function Pending({ person }) {
  return (
    <div className="pending">
      <span>mídia pendente</span>
      <p>O vídeo, áudio ou texto de {person.name} entra aqui assim que chegar.</p>
    </div>
  )
}

function PersonCard({ person, opened, setOpened, index, next }) {
  return (
    <motion.section
      className="screen personScreen"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.35 }}
    >
      <div>
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / 07 · {person.relation}</p>
        <CutLine>{person.name.toUpperCase()}</CutLine>
        <motion.p className="introCopy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          {person.intro}
        </motion.p>

        {!opened ? (
          <div className="spacerButton">
            <Button onClick={() => setOpened(true)}>abrir recado</Button>
          </div>
        ) : (
          <motion.div className="messageWrap" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            {person.kind === 'text' ? (
              <article className="letter">
                <p>{person.text}</p>
                <small>com amor, {person.name}</small>
              </article>
            ) : (
              <Pending person={person} />
            )}
          </motion.div>
        )}
      </div>

      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button onClick={next}>próximo recado</Button>
        </motion.div>
      )}
    </motion.section>
  )
}

function App() {
  const [phase, setPhase] = useState('intro')
  const [introIndex, setIntroIndex] = useState(0)
  const [personIndex, setPersonIndex] = useState(0)
  const [opened, setOpened] = useState(false)

  const nextIntro = () => {
    if (introIndex < introScreens.length - 1) setIntroIndex(introIndex + 1)
    else setPhase('people')
  }

  const nextPerson = () => {
    setOpened(false)
    if (personIndex === 3) {
      setPersonIndex(4)
      setPhase('family')
      return
    }
    if (personIndex < people.length - 1) setPersonIndex(personIndex + 1)
    else setPhase('ending')
  }

  const progress = phase === 'intro'
    ? introIndex + 1
    : phase === 'people'
      ? 4 + personIndex
      : phase === 'family'
        ? 8
        : phase === 'ending'
          ? 11
          : 12

  return (
    <main className="app">
      <div className="progress"><motion.i animate={{ width: Math.min(100, (progress / 12) * 100) + '%' }} /></div>
      <div className="grain" />
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.section
            className="screen"
            key={'intro-' + introIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div>
              <p className="eyebrow">{introScreens[introIndex].eyebrow}</p>
              <div className="headlineStack">
                {introScreens[introIndex].lines.map((line, i) => (
                  <CutLine key={line} delay={i * 0.24} reverse={introIndex === 0 && i === 1}>{line}</CutLine>
                ))}
              </div>
              {introScreens[introIndex].sub && (
                <motion.p className="introCopy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                  {introScreens[introIndex].sub}
                </motion.p>
              )}
            </div>
            <Button onClick={nextIntro}>{introScreens[introIndex].button}</Button>
          </motion.section>
        )}

        {phase === 'people' && (
          <PersonCard
            key={personIndex}
            person={people[personIndex]}
            opened={opened}
            setOpened={setOpened}
            index={personIndex}
            next={nextPerson}
          />
        )}

        {phase === 'family' && (
          <motion.section className="screen dark" key="family" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div>
              <p className="eyebrow inverse">mudança de categoria</p>
              <div className="headlineStack">
                <VerticalCutReveal splitBy="characters" staggerDuration={0.03} transition={{ type: 'spring', stiffness: 200, damping: 21 }} className="headline inverse">OK.</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.45 }} className="headline inverse">AGORA A COISA</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.85 }} className="headline inverse">FICOU SÉRIA.</VerticalCutReveal>
              </div>
              <motion.p className="familyWord" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>família.</motion.p>
            </div>
            <Button light onClick={() => setPhase('people')}>continuar</Button>
          </motion.section>
        )}

        {phase === 'ending' && (
          <motion.section className="screen dark" key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              <p className="eyebrow inverse">7 de 7</p>
              <div className="headlineStack">
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21 }} className="headline inverse">PRONTO.</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.55 }} className="headline inverse">TODO MUNDO</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 1 }} className="headline inverse">JÁ FALOU.</VerticalCutReveal>
              </div>
              <motion.div className="fakeEnd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                <p>...</p>
                <p>quer dizer.</p>
                <strong>quase todo mundo.</strong>
              </motion.div>
            </div>
            <Button light onClick={() => setPhase('finale')}>continuar comigo</Button>
          </motion.section>
        )}

        {phase === 'finale' && (
          <motion.section className="screen" key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              <p className="eyebrow">última parte</p>
              <div className="headlineStack">
                <CutLine>AGORA</CutLine>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.45 }} className="headline">FALTA EU.</VerticalCutReveal>
              </div>
              <motion.div className="yourMessage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
                <span>seu recado final</span>
                <p>Aqui entra a sua última mensagem para ela — curta, pessoal e sem repetir a carta física.</p>
              </motion.div>
            </div>
            <motion.p className="birthday" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>feliz aniversário, meu amor. ♥</motion.p>
          </motion.section>
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
