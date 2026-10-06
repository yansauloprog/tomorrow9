import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const people = [
  {
    name: 'Yasmin',
    description: 'grande amiga e com certeza cúmplice de muitas histórias',
    kind: 'video',
    src: 'https://temporary-nimble-tempest-7y7tdcj.vercel.app/media/yasmin.mp4',
    finalMessage: '',
    mood: 'confidante'
  },
  {
    name: 'Cecílya',
    description: 'sim, por incrível que pareça, ela veio também!',
    kind: 'video',
    src: 'https://temporary-nimble-tempest-7y7tdcj.vercel.app/media/cecilya.mp4',
    finalMessage: '',
    mood: 'surprise'
  },
  {
    name: 'Beatriz',
    description: 'sim, a mãe dela deixou ela mandar!',
    kind: 'text',
    text: 'Você é linda por fora, mas é por dentro que você brilha de verdade.\nTem uma luz que vibra e uma risada que faz parte do seu jeitinho que salva qualquer um.\nEu tenho tanto orgulho de conhecer a mulher que você é.\nMas hoje eu quero mostrar que você é especial como pessoa e amiga verdadeira.\nUma amizade de verdade não é só foto bonita.\nÉ ter com quem contar, fazer-se presente. Mesmo não sendo sempre 100% porque nada é perfeito, porém amar, cuidar, respeitar é fundamental.\nA gente já brigou por besteira, já chorou junto, já riu até doer a barriga.\nVocê me conhece sem filtro nenhum e continua aqui, como eu também estarei quando precisar.\nVocê é a amiga que fica. Que escuta, que puxa a orelha e que vibra por mim.\n18 anos é só o começo de uma fase nova.\nEla vai mudar muita coisa, mas eu quero estar e fazer parte desses novos ciclos.\nFeliz vida, você merece o mundo. Eu amo você!🤍',
    finalMessage: '',
    mood: 'warm'
  },
  {
    name: 'Malu',
    description: 'mensagem quentinha diretamente de Mossoró',
    kind: 'audio',
    src: 'https://zb4kskwhym25wiqp.public.blob.vercel-storage.com/birthday/malu.m4a',
    finalMessage: '',
    mood: 'mossoro'
  },
  {
    name: 'Ramayana',
    description: 'participação mais que obrigatória',
    kind: 'video',
    src: 'https://temporary-nimble-tempest-7y7tdcj.vercel.app/media/ramayana.mp4',
    finalMessage: '',
    mood: 'family'
  },
  {
    name: 'Marquinhos',
    description: 'E claro que o pai também tinha coisa pra dizer.',
    kind: 'audio',
    src: 'https://zb4kskwhym25wiqp.public.blob.vercel-storage.com/birthday/marquinhos.m4a',
    finalMessage: '',
    mood: 'family'
  },
  {
    name: 'Tio Paniagua & Tia Fátima',
    description: 'algumas pessoas simplesmente viram família',
    kind: 'text',
    text: 'Minha querida Thayná, nesta data, a emoção tomava conta de todos e, naquele momento, você chegava para dar alegria e emoção a todos que te esperavam.\n\nSua infância e suas peripécias ficaram gravadas em nossa mente como aquela menininha tão amável, sorridente e alegre.\n\nVocê foi crescendo, debutou, e nós sempre vibrando pela sua vitória e seu sucesso.\n\nE, contudo, o tempo está passando.\n\nO tempo não para e não espera. Siga em frente, galgue tudo que você tem em sua mente, que a família estará sempre junto de você para te ajudar.\n\nAgora, hoje, neste dia, ele é todo seu.\n\nViva na certeza da sua felicidade.\n\nVocê, nos seus dezoito anos, tem o controle de sua vida e dela você será capaz de dominar o seu sucesso.\n\nAssim como nós estamos felizes, você também está muito irradiante de felicidade.\n\nNossos parabéns! Seja feliz. Deus te abençoe sempre.\n\nFelicidades em suas 18 primaveras.',
    finalMessage: '',
    mood: 'letter'
  }
]

const YAN_VIDEO_SRC = '/media/yan.mp4'

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
      initial={{ opacity: 0, x: corner.includes('Left') ? -4 : 4, y: corner.includes('top') ? -3 : 3 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
  onLineComplete,
  className = '',
  defaultLineDelay = 160
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState({})
  const completedRef = useRef(new Set())
  const sequenceKey = JSON.stringify(lines)
  const revealTransition = useMemo(() => ({
    type: 'spring',
    stiffness: 200,
    damping: 21
  }), [])

  useEffect(() => {
    setActiveIndex(0)
    setCompletedLines({})
    completedRef.current = new Set()
  }, [sequenceKey])

  const normalizedLine = (line) =>
    typeof line === 'string' ? { text: line } : line

  const finishLine = (index) => {
    if (completedRef.current.has(index)) return
    completedRef.current.add(index)

    const item = normalizedLine(lines[index])
    setCompletedLines((current) => ({ ...current, [index]: true }))
    onLineComplete?.(index)

    const delay = item.pauseAfter ?? defaultLineDelay

    if (index < lines.length - 1) {
      setTimeout(() => setActiveIndex(index + 1), delay)
      return
    }

    if (onFinished) {
      setTimeout(onFinished, Math.max(delay, item.emojiSrc ? 420 : 180))
    }
  }

  return (
    <div className={'sequentialReveal ' + className}>
      {lines.map((line, index) => {
        if (index > activeIndex) return null
        const item = normalizedLine(line)

        return (
          <div
            className={'revealLine' + (item.emojiSrc ? ' withEmoji' : '')}
            key={item.text + index}
          >
            {item.emojiSrc && <span className="emojiSpacer" aria-hidden="true" />}

            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={revealTransition}
              className={
                'revealText' +
                (inverse ? ' inverse' : '') +
                (item.text.length > 46 ? ' small' : '')
              }
              onComplete={() => finishLine(index)}
            >
              {item.text}
            </VerticalCutReveal>

            {item.emojiSrc && (
              <motion.img
                className="inlineEmoji"
                src={item.emojiSrc}
                alt=""
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: completedLines[index] ? 1 : 0,
                  scale: completedLines[index] ? 1 : 0.65,
                  rotate: completedLines[index] ? 0 : -7
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const introScreens = [
  {
    lines: [
      'Oii, amor da minha vida!!!',
      {
        text: 'Achou que tinha acabado na carta?',
        emojiSrc: '/media/intro-emoji.png'
      }
    ],
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

function lightHaptic(duration = 18) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration)
  }
}

function CenteredTextScreen({
  lines,
  button,
  onNext,
  dark = false,
  flowers = true,
  hapticLine = -1,
  className = ''
}) {
  const [finished, setFinished] = useState(false)

  return (
    <motion.section
      className={
        'centeredScreen' +
        (dark ? ' dark' : '') +
        (className ? ' ' + className : '')
      }
      initial={{ opacity: 0, y: 16, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.995 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      {flowers && (
        <>
          <FloralCorner corner="topLeft" inverse={dark} />
          <FloralCorner corner="bottomRight" inverse={dark} />
        </>
      )}

      <SequentialReveal
        lines={lines}
        inverse={dark}
        onFinished={() => setFinished(true)}
        onLineComplete={(index) => {
          if (index === hapticLine) lightHaptic()
        }}
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

function VideoMedia({ person, onDone, onPlayingChange }) {
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
      onPlay={() => onPlayingChange?.(true)}
      onPause={() => onPlayingChange?.(false)}
      onEnded={() => {
        onPlayingChange?.(false)
        onDone()
      }}
    />
  )
}

function AudioMedia({ person, onDone, onPlayingChange }) {
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
      onPlay={() => onPlayingChange?.(true)}
      onPause={() => onPlayingChange?.(false)}
      onEnded={() => {
        onPlayingChange?.(false)
        onDone()
      }}
    />
  )
}

function CompletionBlock({ message, onNext, buttonLabel, inverse = false }) {
  return (
    <motion.div
      className="completionBlock"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {message && <p className={'finalMessage' + (inverse ? ' inverse' : '')}>{message}</p>}
      <Button onClick={onNext} inverse={inverse}>{buttonLabel}</Button>
    </motion.div>
  )
}

function PersonHeader({ person, settled, detailsVisible, onNameComplete, dimmed }) {
  const longName = person.name.length > 18

  return (
    <motion.header
      className={
        'personHeader' +
        (settled ? ' settled' : ' intro') +
        (dimmed ? ' dimmed' : '')
      }
      initial={false}
      animate={{
        top: settled ? 'var(--person-header-top)' : '50%',
        y: settled ? '0%' : '-50%'
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
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
        onComplete={onNameComplete}
      >
        {person.name}
      </VerticalCutReveal>

      {detailsVisible && (
        <>
          <motion.p
            className="personDescription"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {person.description}
          </motion.p>

          <OrnamentDivider />
        </>
      )}
    </motion.header>
  )
}


function PersonScreen({ person, index = 0, next, onBack }) {
  const [nameDone, setNameDone] = useState(false)
  const [settled, setSettled] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [mediaEnded, setMediaEnded] = useState(false)
  const [mediaDone, setMediaDone] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const isText = person.kind === 'text'
  const isLetter = person.mood === 'letter'

  useEffect(() => {
    if (!nameDone) return
    const timer = setTimeout(() => setSettled(true), 620)
    return () => clearTimeout(timer)
  }, [nameDone])

  useEffect(() => {
    if (!settled) return
    const timer = setTimeout(() => setDetailsVisible(true), 620)
    return () => clearTimeout(timer)
  }, [settled])

  useEffect(() => {
    if (!detailsVisible) return
    const timer = setTimeout(() => setContentVisible(true), 520)
    return () => clearTimeout(timer)
  }, [detailsVisible])

  useEffect(() => {
    if (!contentVisible || !isText) return
    const timer = setTimeout(() => setMediaEnded(true), 700)
    return () => clearTimeout(timer)
  }, [contentVisible, isText])

  useEffect(() => {
    if (!mediaEnded) return
    const timer = setTimeout(() => setMediaDone(true), 680)
    return () => clearTimeout(timer)
  }, [mediaEnded])

  const handleMediaEnded = useCallback(() => {
    setMediaEnded(true)
  }, [])

  return (
    <motion.section
      className={
        'personScreen' +
        (isText ? ' textPerson' : '') +
        (isLetter ? ' letterPerson' : '') +
        (isPlaying ? ' mediaPlaying' : '')
      }
      data-mood={person.mood || 'default'}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloralCorner corner={index % 2 === 0 ? 'topRight' : 'topLeft'} />
      <FloralCorner corner={index % 2 === 0 ? 'bottomLeft' : 'bottomRight'} />

      {settled && (
        <>
          <button className="backButton" onClick={onBack} aria-label="Voltar">
            ←
          </button>
        </>
      )}

      <PersonHeader
        person={person}
        settled={settled}
        detailsVisible={detailsVisible}
        onNameComplete={() => setNameDone(true)}
        dimmed={isPlaying}
      />

      <AnimatePresence mode="wait">
        {contentVisible && (
          <motion.div
            className={'mediaArea' + (isText ? ' textMedia' : '')}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {person.kind === 'text' ? (
              <article className={'textMessage' + (isLetter ? ' familyLetter' : '')}>
                {isLetter && <div className="letterRule" aria-hidden="true"><span /><i>◇</i><span /></div>}
                <p>{person.text}</p>
                {isLetter && <div className="letterRule bottom" aria-hidden="true"><span /><i>◇</i><span /></div>}
              </article>
            ) : person.kind === 'audio' ? (
              <AudioMedia
                person={person}
                onDone={handleMediaEnded}
                onPlayingChange={setIsPlaying}
              />
            ) : (
              <VideoMedia
                person={person}
                onDone={handleMediaEnded}
                onPlayingChange={setIsPlaying}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {contentVisible && mediaDone && (
        <CompletionBlock
          message={person.finalMessage}
          onNext={next}
          buttonLabel={index === people.length - 1 ? 'continuar' : 'próximo'}
        />
      )}
    </motion.section>
  )
}

function YanVideoScreen({ onDone }) {
  const [ended, setEnded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (!ended) return
    const timer = setTimeout(onDone, 950)
    return () => clearTimeout(timer)
  }, [ended, onDone])

  const hasVideo = Boolean(YAN_VIDEO_SRC) && !videoError

  return (
    <motion.section
      className="yanVideoScreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65 }}
    >
      {hasVideo ? (
        <motion.video
          className="yanVideo"
          src={YAN_VIDEO_SRC}
          controls
          playsInline
          preload="metadata"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          onEnded={() => setEnded(true)}
          onError={() => setVideoError(true)}
        />
      ) : (
        <motion.div
          className="yanPlaceholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <span>vídeo do Yan</span>
          <Button inverse onClick={onDone}>continuar</Button>
        </motion.div>
      )}
    </motion.section>
  )
}

function FinaleScreen() {
  const [finished, setFinished] = useState(false)

  return (
    <motion.section
      className="finaleScreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <FloralCorner corner="topLeft" />
      <FloralCorner corner="bottomRight" />

      <SequentialReveal
        lines={[
          'Feliz aniversário, meu amor.',
          'Sempre farei de tudo que for possível para seu aniversário nunca ser "só mais um dia".',
          'Eu te amo mais que tudo, aproveite sua semana, minha gata!'
        ]}
        onFinished={() => {
          setFinished(true)
          lightHaptic(26)
        }}
        className="finalMessageSequence"
        defaultLineDelay={260}
      />

      {finished && (
        <motion.div
          className="finaleFooter"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          <OrnamentDivider />
          <span>06.10.2026</span>
        </motion.div>
      )}
    </motion.section>
  )
}

function loadProgress() {
  if (typeof window === 'undefined') {
    return { phase: 'intro', introIndex: 0, personIndex: 0 }
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem('thayna-birthday-progress-v2') || '{}')
    const validPhases = ['intro', 'people', 'family', 'ending', 'yanIntro', 'yanVideo', 'yanAfter', 'finale']
    return {
      phase: validPhases.includes(saved.phase) ? saved.phase : 'intro',
      introIndex: Math.min(Math.max(Number(saved.introIndex) || 0, 0), introScreens.length - 1),
      personIndex: Math.min(Math.max(Number(saved.personIndex) || 0, 0), people.length - 1)
    }
  } catch {
    return { phase: 'intro', introIndex: 0, personIndex: 0 }
  }
}

function App() {
  const [initialProgress] = useState(() => loadProgress())
  const [phase, setPhase] = useState(initialProgress.phase)
  const [introIndex, setIntroIndex] = useState(initialProgress.introIndex)
  const [personIndex, setPersonIndex] = useState(initialProgress.personIndex)

  useEffect(() => {
    sessionStorage.setItem(
      'thayna-birthday-progress-v2',
      JSON.stringify({ phase, introIndex, personIndex })
    )
  }, [phase, introIndex, personIndex])

  useEffect(() => {
    const img = new Image()
    img.src = '/media/intro-emoji.png'
  }, [])

  useEffect(() => {
    let startIndex = -1

    if (phase === 'intro' && introIndex === introScreens.length - 1) {
      startIndex = 0
    } else if (phase === 'people') {
      startIndex = personIndex + 1
    } else if (phase === 'family') {
      startIndex = 4
    }

    if (startIndex < 0) return

    const nextMedia = people.slice(startIndex).find((person) => person.src)
    if (!nextMedia) return

    const element = document.createElement(nextMedia.kind === 'video' ? 'video' : 'audio')
    element.preload = 'metadata'
    element.src = nextMedia.src
    element.load()

    return () => {
      element.removeAttribute('src')
      element.load()
    }
  }, [phase, introIndex, personIndex])

  useEffect(() => {
    if (!YAN_VIDEO_SRC || !['ending', 'yanIntro'].includes(phase)) return

    const yanPreload = document.createElement('video')
    yanPreload.preload = 'metadata'
    yanPreload.src = YAN_VIDEO_SRC
    yanPreload.load()

    return () => {
      yanPreload.removeAttribute('src')
      yanPreload.load()
    }
  }, [phase])

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

  const backPerson = () => {
    if (personIndex <= 0) {
      setIntroIndex(introScreens.length - 1)
      setPhase('intro')
      return
    }

    if (personIndex === 4) {
      setPersonIndex(3)
      setPhase('people')
      return
    }

    setPersonIndex((current) => Math.max(0, current - 1))
  }

  return (
    <main className="app">
      <AnimatePresence mode="wait" initial={false}>
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
            onBack={backPerson}
          />
        )}

        {phase === 'family' && (
          <CenteredTextScreen
            key="family"
            lines={[
              { text: 'Agora a coisa ficou séria.', pauseAfter: 1000 },
              'Família.'
            ]}
            button="continuar"
            onNext={() => setPhase('people')}
            dark
            hapticLine={1}
          />
        )}

        {phase === 'ending' && (
          <CenteredTextScreen
            key="ending"
            lines={[
              { text: 'Pronto.', pauseAfter: 260 },
              { text: 'Todo mundo já falou.', pauseAfter: 420 },
              { text: '...quer dizer.', pauseAfter: 520 },
              'Quase todo mundo.'
            ]}
            button="continuar comigo"
            onNext={() => setPhase('yanIntro')}
            dark
            hapticLine={3}
          />
        )}

        {phase === 'yanIntro' && (
          <CenteredTextScreen
            key="yanIntro"
            lines={['Agora sim, faltava eu.']}
            button="continuar"
            onNext={() => setPhase('yanVideo')}
            dark
            flowers={false}
            hapticLine={0}
            className="yanIntroScreen"
          />
        )}

        {phase === 'yanVideo' && (
          <YanVideoScreen
            key="yanVideo"
            onDone={() => setPhase('yanAfter')}
          />
        )}

        {phase === 'yanAfter' && (
          <CenteredTextScreen
            key="yanAfter"
            lines={[
              { text: 'eu te amo.', pauseAfter: 520 },
              'feliz 18, minha adultinha.'
            ]}
            button="continuar"
            onNext={() => setPhase('finale')}
            dark
            flowers={false}
            className="yanAfterScreen"
          />
        )}

        {phase === 'finale' && <FinaleScreen key="finale" />}
      </AnimatePresence>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
