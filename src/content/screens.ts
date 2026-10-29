import angry from '@assets/angry.png'
import please from '@assets/please.png'
import recorded from '@assets/recorded.png'

export type Illustration = {
  src: string
  /** Described for anyone who cannot see the plate. */
  alt: string
  width: number
  height: number
}

export type AskContent = {
  id: 'sorry' | 'date'
  illustration: Illustration
  heading: string
  body: string
  /** Shown in order as she keeps tapping no. */
  noLabels: readonly string[]
  okayLabel: string
  /** Announced to screen readers when the okay button turns up. */
  arrival: string
  docTitle: string
}

export const ASK_SCREENS: readonly AskContent[] = [
  {
    id: 'sorry',
    illustration: {
      src: angry,
      alt: 'Two cartoon bears: a small white bear sulking with her eyes shut and her cheeks puffed out, while a brown bear gently reaches out to her.',
      width: 220,
      height: 184,
    },
    heading: "Manvi, I'm sorry.",
    body: 'Will you forgive me?..... please',
    noLabels: ['No', 'please', 'pretty please', 'last time', 'please...'],
    okayLabel: "It's okay",
    arrival: "The it's okay button has appeared, below the no button.",
    docTitle: 'Sorry, Manvi',
  },
  {
    id: 'date',
    illustration: {
      src: please,
      alt: 'An illustrated couple: a boy carrying a girl in his arms, her head resting on his shoulder, both smiling with their eyes closed.',
      width: 658,
      height: 658,
    },
    heading: 'One more chance?',
    body: 'Come out with me again. Our second date.',
    noLabels: ['No', 'please', 'please'],
    okayLabel: "Yes, let's go",
    arrival: "The yes, let's go button has appeared, below the no button.",
    docTitle: 'One more chance, Manvi?',
  },
]

export const CELEBRATION = {
  illustration: {
    src: recorded,
    alt: 'An illustrated couple in a close hug, one lifting the other clean off the ground.',
    width: 415,
    height: 739,
  } satisfies Illustration,
  heading: "It's a date...",
  body: "Our second one...",
  /** The last beat on the page. */
  closing: 'Waffle it is.',
  docTitle: "It's a date...",
  replayLabel: 'Read it again',
}
