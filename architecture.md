# Frontend Architecture

## Overview

`pokemon-frontend` is a single-page application (SPA) built with Create
React App. It has **no client-side router** — the entire app is a single
component tree mounted once into `public/index.html`. As a result, every
URL path (including `/login`, which has no dedicated page or component)
resolves to the exact same rendered output: whatever `src/App.js` returns
for the current data-fetching state.

## Component Breakdown

```
src/
├── App.js                     # Root component: owns state, data fetching, and layout
├── App.css                    # Styling for App.js (header, footer, grid, states)
├── index.js                   # React entry point, mounts <App /> into #root
├── components/
│   ├── FilterBar.js           # Search box + type/legendary select filters
│   ├── FilterBar.css
│   ├── PokemonCard.js         # Renders a single Pokemon's image/name/types
│   ├── LoadingSpinner.js      # Animated Pokeball spinner shown while loading
│   └── LoadingSpinner.css
```

`App` is the only stateful component. It fetches data on mount, holds the
current filter selections, and passes derived data down to `FilterBar` and
`PokemonCard` via props. `FilterBar`, `PokemonCard`, and `LoadingSpinner`
are presentational and do not fetch data themselves.

## Render States

`App.js` renders one of three mutually exclusive branches on every render,
driven by the `loading` and `error` state variables set during the
`fetchInitialData` effect:

1. **Loading** — shown immediately on mount, before the initial fetch to
   the backend resolves. Renders the header and `<LoadingSpinner />`.
2. **Error** — shown if either backend request
   (`/api/pokemons` or `/api/types`) fails. Renders a connection-error
   message with a retry button that reloads the page.
3. **Success (main content)** — shown once both requests resolve. Renders
   the header, `FilterBar`, results count, and either the `pokemon-grid` of
   `PokemonCard`s or a "no results" message, depending on the active
   filters.

Every one of these three branches renders a persistent
`<footer className="app-footer">` element containing the text
`codeCake AI Agent`, so that text is present on the page regardless of
which state the app is in when it is checked — including on `/login`,
which (per the "no router" note above) mounts this same component tree.

## Data Flow

- The backend base URL comes from `REACT_APP_API_URL` (falling back to
  `http://localhost:3001`), configured via the `.env`/`.env.example` file.
- On mount, `App` fetches `${API_BASE_URL}/api/pokemons` and
  `${API_BASE_URL}/api/types` in parallel.
- Successful responses populate `pokemons`, `filteredPokemons`, and
  `types` state.
- A second effect re-derives `filteredPokemons` from `pokemons` whenever
  `filters` or `pokemons` change, applying name/type/legendary filters
  client-side.
- Failures set an `error` message and switch the component into the error
  render branch described above.
