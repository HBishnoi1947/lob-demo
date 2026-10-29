export type Scene = {
  /** Shruti. */
  her: string
  /** Me, apologising. */
  him: string
  /** Whatever I'm holding out as a peace offering. */
  prop: string
  /** Read aloud in place of the emoji, which are decorative on their own. */
  description: string
}

export type AskContent = {
  id: 'sorry' | 'date'
  scene: Scene
  heading: string
  aside: string
  body: string
  /** Shown in order as she keeps tapping No. */
  noLabels: readonly string[]
  okayLabel: string
  /** Announced to screen readers when the okay button turns up. */
  arrival: string
  docTitle: string
}

export const ASK_SCREENS: readonly AskContent[] = [
  {
    id: 'sorry',
    scene: {
      her: '😤',
      him: '🙇‍♂️',
      prop: '💐',
      description:
        'Shruti standing with her cheeks puffed out, cross with me, while I bow and hold out a bunch of flowers.',
    },
    heading: 'Shruti, I am so sorry.',
    aside: 'माफ़ कर दो ना',
    body: 'I messed up, and it has been sitting on my chest all day. Will you forgive me?',
    noLabels: ['No', 'Really? 🥺'],
    okayLabel: "It's okay",
    arrival: "The it's okay button is here now, just below the no button.",
    docTitle: 'Sorry, Shruti',
  },
  {
    id: 'date',
    scene: {
      her: '🙂',
      him: '🥺',
      prop: '🌹',
      description:
        'Shruti softening into a small smile while I hold out a single rose and ask hopefully.',
    },
    heading: 'One more chance?',
    aside: 'फिर मिलोगी ना?',
    body: 'Come out with me again — our second date. I will plan the whole evening.',
    noLabels: ['No', 'Please? 🌹'],
    okayLabel: "Okay, let's go",
    arrival: "The okay, let's go button is here now, just below the no button.",
    docTitle: 'One more chance, Shruti?',
  },
]

export const CELEBRATION = {
  heading: "It's a date, Shruti!",
  aside: 'श्रुति 💕',
  body: 'Date number two is on. I pick the place, you pick the dessert — that is the deal.',
  scene: {
    her: '🥰',
    him: '🤗',
    prop: '🎟️',
    description: 'Shruti and me grinning at each other, two tickets in hand.',
  } satisfies Scene,
  docTitle: "It's a date, Shruti!",
  replayLabel: 'Play it again',
}

export const CONFETTI = ['💕', '🎉', '💛', '🌸', '✨', '💐'] as const
