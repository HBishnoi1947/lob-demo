import type { Illustration } from '@/content/screens'

type Props = {
  illustration: Illustration
}

/**
 * A mounted print: hairline frame, a mat around it, and a window of fixed
 * size. The three illustrations have very different proportions, so a uniform
 * window keeps them looking like plates in the same book — and keeps the page
 * from shifting as she moves between screens.
 */
export function Plate({ illustration }: Props) {
  return (
    <figure className="anim-plate mx-auto w-fit max-w-full border border-rule bg-plate p-3">
      <div className="flex h-[min(34vh,14rem)] w-[min(70vw,17rem)] items-center justify-center border border-rule/60 bg-plate p-2">
        <img
          src={illustration.src}
          alt={illustration.alt}
          width={illustration.width}
          height={illustration.height}
          className="anim-breathe max-h-full max-w-full object-contain"
        />
      </div>
    </figure>
  )
}
