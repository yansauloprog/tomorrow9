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
    sub: 'Algumas pessoas toparam participar dessa pequena operação.',
    button: 'quero ver'
  }
]

function CutLine({ children, delay = 0, reverse = false, inverse = false }) {
  return (
    <VerticalCutReveal
      splitBy="characters"
      staggerDuration={0.025}
      staggerFrom="first"
      reverse={reverse}
      transition={{ type: 'spring', stiffness: 200, damping: 21, delay }}
      className={'headline' + (inverse ? ' inverse' : '')}
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
      transition={{ delay: 0.65, duration: 0.4 }}
      whileTap={{ scale: 0.975 }}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="arrow">↗</span>
    </motion.button>
  )
}

function IntroEditorial({ index }) {
  if (index === 0) {
    return (
      <motion.div className="editorialStage coverStage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
        <div className="giant18">18</div>
        <div className="ticket ticketA">
          <span>PARA</span>
          <strong>THAYNÁ</strong>
          <small>uma coisinha que não coube na carta</small>
        </div>
        <div className="stamp">
          <b>06</b>
          <span>OCT</span>
        </div>
        <div className="scribble">continua →</div>
      </motion.div>
    )
  }

  if (index === 1) {
    return (
      <motion.div className="editorialStage statStage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <div className="statCard big">
          <span>coisas que eu ainda tinha pra dizer</span>
          <strong>∞</strong>
        </div>
        <div className="statRow">
          <div className="statCard">
            <span>pessoas recrutadas</span>
            <strong>08</strong>
          </div>
          <div className="statCard accent">
            <span>chance de choro</span>
            <strong>alta</strong>
          </div>
        </div>
        <p className="marginNote">sim, isso foi organizado.</p>
      </motion.div>
    )
  }

  return (
    <motion.div className="editorialStage dossierStage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
      <div className="dossierTop">
        <span>arquivo nº 0610</span>
        <span>confidencial*</span>
      </div>
      <div className="dossierBody">
        <strong>7 recados</strong>
        <div className="formatRail">
          <span>texto</span><i>•</i><span>áudio</span><i>•</i><span>vídeo</span>
        </div>
      </div>
      <div className="tape">*nem tanto</div>
    </motion.div>
  )
}

function Pending({ person }) {
  const initials = person.name
    .split(/\s|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <div className="pending">
      <div className="pendingMonogram">{initials}</div>
      <div>
        <span>espaço reservado</span>
        <p>O vídeo, áudio ou texto de {person.name} entra aqui assim que chegar.</p>
      </div>
    </div>
  )
}

function PersonPoster({ person, index }) {
  const initials = person.name
    .split(/\s|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <motion.div className="personPoster" initial={{ opacity: 0, scale: .985, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .75, duration: .45 }}>
      <div className="posterIndex">{String(index + 1).padStart(2, '0')}</div>
      <div className="posterMeta">
        <span>recado {String(index + 1).padStart(2, '0')}</span>
        <span>06.10.26</span>
      </div>
      <div className="posterMonogram">{initials}</div>
      <div className="posterFooter">
        <span>{person.relation}</span>
        <i>→</i>
      </div>
    </motion.div>
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
      <div className="screenContent">
        <div className="metaRow">
          <p className="eyebrow">{String(index + 1).padStart(2, '0')} / 07</p>
          <span className="tinyTag">{person.relation}</span>
        </div>
        <CutLine>{person.name.toUpperCase()}</CutLine>
        <motion.p className="introCopy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          {person.intro}
        </motion.p>

        {!opened ? (
          <>
            <PersonPoster person={person} index={index} />
            <Button onClick={() => setOpened(true)}>abrir recado</Button>
          </>
        ) : (
          <motion.div className="messageWrap" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            {person.kind === 'text' ? (
              <article className="letter">
                <div className="letterHeader">
                  <span>mensagem</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p>{person.text}</p>
                <small>com amor, {person.name}</small>
              </article>
            ) : (
              <Pending person={person} />
            )}
            <div className="nextWrap"><Button onClick={next}>próximo recado</Button></div>
          </motion.div>
        )}
      </div>
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
      <div className="topChrome">
        <span>THAYNÁ / XVIII</span>
        <span>06.10.2026</span>
      </div>
      <div className="progress"><motion.i animate={{ width: Math.min(100, (progress / 12) * 100) + '%' }} /></div>
      <div className="grain" />
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.section
            className="screen introScreen"
            key={'intro-' + introIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="screenContent">
              <p className="eyebrow">{introScreens[introIndex].eyebrow}</p>
              <div className="headlineStack">
                {introScreens[introIndex].lines.map((line, i) => (
                  <CutLine key={line} delay={i * 0.2} reverse={introIndex === 0 && i === 1}>{line}</CutLine>
                ))}
              </div>
              {introScreens[introIndex].sub && (
                <motion.p className="introCopy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
                  {introScreens[introIndex].sub}
                </motion.p>
              )}
              <IntroEditorial index={introIndex} />
              <Button onClick={nextIntro}>{introScreens[introIndex].button}</Button>
            </div>
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
          <motion.section className="screen dark familyScreen" key="family" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="screenContent">
              <p className="eyebrow inverse">mudança de categoria</p>
              <div className="headlineStack">
                <CutLine inverse>OK.</CutLine>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.36 }} className="headline inverse">AGORA A COISA</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.72 }} className="headline inverse">FICOU SÉRIA.</VerticalCutReveal>
              </div>

              <motion.div className="familyEditorial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
                <span className="familyBig">família.</span>
                <div className="familyTicket">
                  <span>capítulo 02</span>
                  <strong>as pessoas que sempre estiveram por perto.</strong>
                </div>
                <div className="familySeal">♥</div>
              </motion.div>
              <Button light onClick={() => setPhase('people')}>continuar</Button>
            </div>
          </motion.section>
        )}

        {phase === 'ending' && (
          <motion.section className="screen dark endingScreen" key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="screenContent">
              <p className="eyebrow inverse">7 de 7</p>
              <div className="headlineStack">
                <CutLine inverse>PRONTO.</CutLine>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.38 }} className="headline inverse">TODO MUNDO</VerticalCutReveal>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.78 }} className="headline inverse">JÁ FALOU.</VerticalCutReveal>
              </div>

              <motion.div className="endingCard" initial={{ opacity: 0, rotate: 2, y: 18 }} animate={{ opacity: 1, rotate: -1, y: 0 }} transition={{ delay: 1.35 }}>
                <span>FIM?</span>
                <div className="endingRule" />
                <p>...</p>
                <p>quer dizer.</p>
                <strong>quase todo mundo.</strong>
              </motion.div>

              <Button light onClick={() => setPhase('finale')}>continuar comigo</Button>
            </div>
          </motion.section>
        )}

        {phase === 'finale' && (
          <motion.section className="screen finaleScreen" key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="screenContent">
              <p className="eyebrow">última parte</p>
              <div className="headlineStack">
                <CutLine>AGORA</CutLine>
                <VerticalCutReveal splitBy="characters" staggerDuration={0.025} transition={{ type: 'spring', stiffness: 200, damping: 21, delay: 0.4 }} className="headline">FALTA EU.</VerticalCutReveal>
              </div>

              <motion.div className="finalCollage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <div className="loveCard">
                  <span>para thayná</span>
                  <strong>XVIII</strong>
                </div>
                <div className="yourMessage">
                  <span>seu recado final</span>
                  <p>Aqui entra a sua última mensagem para ela — curta, pessoal e sem repetir a carta física.</p>
                </div>
                <div className="kissNote">agora olha pra mim.</div>
              </motion.div>

              <motion.p className="birthday" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55 }}>feliz aniversário, meu amor. ♥</motion.p>
            </div>
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
