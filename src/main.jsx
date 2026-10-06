import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const people = [
  {
    name: 'Yasmin',
    description: 'grande amiga e com certeza cúmplice de muitas histórias',
    kind: 'video',
    src: '',
    finalMessage: 'se existe alguma história sua que eu ainda não sei, é bem capaz dela saber.'
  },
  {
    name: 'Cecílya',
    description: 'sim, por incrível que pareça, ela veio também!',
    kind: 'audio',
    src: '',
    finalMessage: ''
  },
  {
    name: 'Beatriz',
    description: 'sim, a mãe dela deixou ela mandar!',
    kind: 'text',
    text: 'Você é linda por fora, mas é por dentro que você brilha de verdade.\nTem uma luz que vibra e uma risada que faz parte do seu jeitinho que salva qualquer um.\nEu tenho tanto orgulho de conhecer a mulher que você é.\nMas hoje eu quero mostrar que vc é especial como pessoa, e amiga verdadeira.\nCom uma amizade de verdade não é só foto bonita.\nÉ ter com quem contar, e fazer presente. Mesmo não sendo sempre 100% por que nada e perfeito, porém amar, cuida,respeitar e fundamental \nA gente já brigou por besteira, já chorou junto, já riu até doer a barriga.\nVocê me conhece sem filtro nenhum e continua aqui,como eu também estou quando precisar.\nVocê é a amiga que fica. Que escuta, que puxa a orelha e que vibra por mim.\n18 anos é só o começo da uma fase nova.\nQue vai mudar muita coisa, mas eu quero estar e fazer parte nesses novos ciclos.\nFeliz vida,você merece o mundo. Eu amo você!🤍',
    finalMessage: ''
  },
  {
    name: 'Malu',
    description: 'mensagem quentinha diretamente de Mossoró',
    kind: 'audio',
    src: '',
    finalMessage: ''
  },
  {
    name: 'Lucas',
    description: 'Por ele você não esperava, né?',
    kind: 'audio',
    src: '',
    finalMessage: ''
  },
  {
    name: 'Ramayana',
    description: 'participação mais que obrigatória',
    kind: 'video',
    src: '',
    finalMessage: ''
  },
  {
    name: 'Marquinhos',
    description: 'E claro que o pai também tinha coisa pra dizer.',
    kind: 'audio',
    src: '',
    finalMessage: ''
  },
  {
    name: 'Tio Paniagua & Tia Fátima',
    description: 'algumas pessoas simplesmente viram família',
    kind: 'text',
    text: 'Minha querida Thayná, nesta data, a emoção tomava conta de todos e, naquele momento, você chegava para dar alegria e emoção a todos que te esperavam.\n\nSua infância e suas peripécias ficaram gravadas em nossa mente como aquela menininha tão amável, sorridente e alegre.\n\nVocê foi crescendo, debutou, e nós sempre vibrando pela sua vitória e seu sucesso.\n\nE, contudo, o tempo está passando.\n\nO tempo não para e não espera. Siga em frente, galgue tudo que você tem em sua mente, que a família estará sempre junto de você para te ajudar.\n\nAgora, hoje, neste dia, ele é todo seu.\n\nViva na certeza da sua felicidade.\n\nVocê, nos seus dezoito anos, tem o controle de sua vida e dela você será capaz de dominar o seu sucesso.\n\nAssim como nós estamos felizes, você também está muito irradiante de felicidade.\n\nNossos parabéns! Seja feliz. Deus te abençoe sempre.\n\nFelicidades em suas 18 primaveras.',
    finalMessage: ''
  }
]

const yan = {
  name: 'Yan',
  description: 'Agora sim, faltava eu.',
  kind: 'video',
  src: '',
  finalMessage: ''
}

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

function FloralCorner({ corner = 'topLeft', inverse = false }) {
  return (
    <motion.svg
      className={'floralCorner ' + corner + (inverse ? ' inverse' : '')}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.7 }}
    >
      <path d="M10 104C23 91 28 70 34 54C41 35 56 21 79 12" />
      <path d="M33 58C20 54 13 47 9 36C20 37 30 43 36 51" />
      <path d="M47 35C40 24 40 14 44 7C53 16 55 26 51 37" />
      <path d="M61 24C64 13 72 7 82 6C83 16 77 24 66 28" />
      <path d="M82 13C88 7 98 8 104 13C100 21 92 25 83 22" />
      <path d="M77 16C74 22 75 30 81 34C88 32 92 25 91 18C87 12 81 10 77 16Z" />
      <path d="M80 17C84 18 86 21 86 24C83 27 80 28 77 27C76 23 77 20 80 17Z" />
      <path d="M30 66C42 65 51 70 56 80C45 83 35 78 30 66Z" />
      <path d="M18 84C27 82 35 86 40 94C31 99 22 95 18 84Z" />
    </motion.svg>
  )
}

function OrnamentDivider({ inverse = false }) {
  return (
    <motion.div
      className={'ornamentDivider' + (inverse ? ' inverse' : '')}
      initial={{ opacity: 0, scaleX: 0.55 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.55 }}
      aria-hidden="true"
    >
      <span />
      <svg viewBox="0 0 42 18" fill="none">
        <path d="M1 9C9 9 10 2 17 2C22 2 23 7 21 9C19 11 17 8 19 6C22 3 27 3 30 6C33 9 35 9 41 9" />
        <path d="M21 9C20 13 23 16 27 16" />
      </svg>
      <span />
    </motion.div>
  )
}

function Button({ children, onClick, inverse = false }) {
  return (
    <motion.button
      className={'actionButton' + (inverse ? ' inverse' : '')}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </motion.button>
  )
}

function SequentialReveal({
  lines,
  inverse = false,
  onFinished,
  className = ''
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sequenceKey = lines.join('\u0001')

  useEffect(() => {
    setActiveIndex(0)
  }, [sequenceKey])

  const finishLine = (index) => {
    if (index < lines.length - 1) {
      setTimeout(() => {
        setActiveIndex(index + 1)
      }, 160)
      return
    }

    if (onFinished) {
      setTimeout(onFinished, 180)
    }
  }

  return (
    <div className={'sequentialReveal ' + className}>
      {lines.map((line, index) => {
        if (index > activeIndex) return null

        return (
          <VerticalCutReveal
            key={line + index}
            splitBy="characters"
            staggerDuration={0.025}
            staggerFrom="first"
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 21
            }}
            className={
              'revealText' +
              (inverse ? ' inverse' : '') +
              (line.length > 46 ? ' small' : '')
            }
            onComplete={() => finishLine(index)}
          >
            {line}
          </VerticalCutReveal>
        )
      })}
    </div>
  )
}

const introScreens = [
  {
    lines: ['Oi, amor.', 'Achou que a carta tinha acabado?'],
    button: 'continuar'
  },
  {
    lines: [
      'Eu poderia continuar falando sobre você por horas.',
      'Só que aparentemente eu não sou o único.'
    ],
    button: 'continuar'
  },
  {
    lines: ['Então eu convoquei reforços.'],
    button: 'quero ver'
  }
]

function CenteredTextScreen({ lines, button, onNext, dark = false }) {
  const [finished, setFinished] = useState(false)

  return (
    <motion.section
      className={'centeredScreen' + (dark ? ' dark' : '')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32 }}
    >
      <FloralCorner corner="topLeft" inverse={dark} />
      <FloralCorner corner="bottomRight" inverse={dark} />

      <SequentialReveal
        lines={lines}
        inverse={dark}
        onFinished={() => setFinished(true)}
        className="centeredMessage"
      />

      {button && finished && (
        <div className="centeredButton">
          <Button onClick={onNext} inverse={dark}>
            {button}
          </Button>
        </div>
      )}
    </motion.section>
  )
}

function VideoMedia({ person, onDone }) {
  useEffect(() => {
    if (person.src) return
    const timer = setTimeout(onDone, 850)
    return () => clearTimeout(timer)
  }, [person.src, onDone])

  if (!person.src) {
    return (
      <motion.div
        className="pendingMedia"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <span>espaço reservado para o vídeo de {person.name}</span>
      </motion.div>
    )
  }

  return (
    <video
      className="videoMedia"
      src={person.src}
      controls
      playsInline
      preload="metadata"
      onEnded={onDone}
    />
  )
}

function AudioMedia({ person, onDone }) {
  useEffect(() => {
    if (person.src) return
    const timer = setTimeout(onDone, 850)
    return () => clearTimeout(timer)
  }, [person.src, onDone])

  if (!person.src) {
    return (
      <motion.div
        className="pendingAudio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <span>áudio de {person.name}</span>
      </motion.div>
    )
  }

  return (
    <audio
      className="audioMedia"
      src={person.src}
      controls
      preload="metadata"
      onEnded={onDone}
    />
  )
}

function CompletionBlock({ message, onNext, buttonLabel }) {
  return (
    <motion.div
      className="completionBlock"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {message && <p className="finalMessage">{message}</p>}
      <Button onClick={onNext}>{buttonLabel}</Button>
    </motion.div>
  )
}

function PersonHeader({ person, onReady }) {
  const [nameDone, setNameDone] = useState(false)
  const longName = person.name.length > 18

  useEffect(() => {
    if (!nameDone) return
    const timer = setTimeout(onReady, 620)
    return () => clearTimeout(timer)
  }, [nameDone, onReady])

  return (
    <header className="personHeader">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 21
        }}
        className={'personName' + (longName ? ' long' : '')}
        onComplete={() => setNameDone(true)}
      >
        {person.name}
      </VerticalCutReveal>

      {nameDone && (
        <>
          <motion.p
            className="personDescription"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
          >
            {person.description}
          </motion.p>

          <OrnamentDivider />
        </>
      )}
    </header>
  )
}

function PersonScreen({ person, index = 0, next, buttonLabel, final = false }) {
  const [headerReady, setHeaderReady] = useState(false)
  const [mediaDone, setMediaDone] = useState(person.kind === 'text')

  const nextLabel =
    buttonLabel ||
    (final ? 'terminar' : index === people.length - 1 ? 'continuar' : 'próximo')

  return (
    <motion.section
      className="personScreen"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.32 }}
    >
      <FloralCorner corner={index % 2 === 0 ? 'topRight' : 'topLeft'} />
      <FloralCorner corner={index % 2 === 0 ? 'bottomLeft' : 'bottomRight'} />

      <PersonHeader
        person={person}
        onReady={() => setHeaderReady(true)}
      />

      <AnimatePresence mode="wait">
        {headerReady && (
          <motion.div
            className={'mediaArea' + (person.kind === 'text' ? ' textMedia' : '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {person.kind === 'text' ? (
              <article className="textMessage">
                <p>{person.text}</p>
              </article>
            ) : person.kind === 'audio' ? (
              <AudioMedia
                person={person}
                onDone={() => setMediaDone(true)}
              />
            ) : (
              <VideoMedia
                person={person}
                onDone={() => setMediaDone(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {headerReady && mediaDone && (
        <CompletionBlock
          message={person.finalMessage}
          onNext={next}
          buttonLabel={nextLabel}
        />
      )}
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
    if (personIndex === 4) {
      setPersonIndex(5)
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
            lines={[
              'Pronto.',
              'Todo mundo já falou.',
              '...quer dizer.',
              'Quase todo mundo.'
            ]}
            button="continuar comigo"
            onNext={() => setPhase('yanIntro')}
            dark
          />
        )}

        {phase === 'yanIntro' && (
          <CenteredTextScreen
            key="yanIntro"
            lines={['Agora sim, faltava eu.']}
            button="continuar"
            onNext={() => setPhase('yanVideo')}
          />
        )}

        {phase === 'yanVideo' && (
          <PersonScreen
            key="yanVideo"
            person={yan}
            index={0}
            final
            next={() => setPhase('finale')}
          />
        )}

        {phase === 'finale' && (
          <CenteredTextScreen
            key="finale"
            lines={[
              'Feliz aniversário, meu amor.',
              'Sempre farei de tudo que for possível para seu aniversário nunca ser "só mais um dia".',
              'Eu te amo mais que tudo, aproveite sua semana, minha gata!'
            ]}
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
