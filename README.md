# Sorry, Shruti

A small two-question page: an apology, then an invitation to a second date.
The "no" button has opinions about being pressed.

## Running it

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm test
npm run build
```

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages via
`.github/workflows/deploy.yml`. Set **Settings → Pages → Source** to
**GitHub Actions** once; the first push does the rest.

Asset paths are relative (`base: './'` in `vite.config.ts`), so the same build
works at `https://<user>.github.io/<repo>/` and at a domain root.

## Where things are

| Path | What's in it |
| --- | --- |
| `assets/` | The three illustrations |
| `src/content/screens.ts` | Every word on the page, and which image goes where |
| `src/lib/jump.ts` | Where the no button is allowed to jump to |
| `src/components/` | The screens themselves |

## Two things worth keeping

- The no button dodges on tap only, never on hover or focus, so it stays usable
  with a keyboard or a screen reader.
- Every animation is switched off under `prefers-reduced-motion`.
