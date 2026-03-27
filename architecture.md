# Pokemon Frontend Architecture

## Technology Stack

- **Framework**: React 18.2
- **Language**: JavaScript (ES6+)
- **Styling**: Plain CSS (component-scoped)
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Deployment**: Docker + Nginx (serves static build on port 80)

## Project Structure

```
pokemon-frontend/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.js              # Root component (data fetching, filtering, routing states)
│   ├── App.css             # Global and App-level styles
│   ├── index.js            # React DOM entry point
│   └── components/
│       ├── FilterBar.js    # Search and filter controls (name, type, legendary)
│       ├── FilterBar.css
│       ├── PokemonCard.js  # Individual Pokemon display card
│       ├── PokemonCard.css
│       ├── LoadingSpinner.js  # Loading indicator
│       └── LoadingSpinner.css
├── package.json
├── DEPLOY.md
└── architecture.md         # This file
```

## Component Hierarchy

```
App
├── FilterBar        # User inputs for filtering Pokemon
├── LoadingSpinner   # Shown during initial data fetch
└── PokemonCard[]    # Grid of Pokemon cards (one per result)
```

## Data Flow

1. **App.js** fetches all Pokemon and available types from the backend API on mount (`useEffect`).
2. Pokemon data and types are stored in React state (`useState`).
3. **FilterBar** receives current filters and emits changes via `onFilterChange` callback.
4. A second `useEffect` in App.js recomputes `filteredPokemons` whenever filters or the Pokemon list change.
5. **PokemonCard** components render the filtered results in a CSS grid.

### State Management

All state is managed locally in App.js using React hooks (`useState`, `useEffect`). No external state library is used.

| State Variable      | Purpose                                      |
|---------------------|----------------------------------------------|
| `pokemons`          | Full list of Pokemon from the API            |
| `filteredPokemons`  | Subset after applying active filters         |
| `types`             | Available Pokemon types for the filter dropdown |
| `filters`           | Current filter values (name, type, legendary)|
| `loading`           | Whether the initial fetch is in progress     |
| `error`             | Error message if the fetch fails             |

## API Integration

The frontend communicates with the Pokemon backend API:

| Endpoint            | Method | Purpose                     |
|---------------------|--------|-----------------------------|
| `/api/pokemons`     | GET    | Fetch all Pokemon data      |
| `/api/types`        | GET    | Fetch available Pokemon types |

- **Base URL** is configured via the `REACT_APP_API_URL` environment variable (defaults to `http://localhost:3001`).
- In development, the `proxy` field in `package.json` forwards API requests to `http://localhost:3001`.

## Render States

App.js has three distinct render paths:

1. **Loading**: Header + LoadingSpinner + Footer
2. **Error**: Header + error message with retry button + Footer
3. **Normal**: Header + FilterBar + results grid (or "no results" message) + Footer

## Deployment

- **Docker build**: `npm run docker:build` creates a production image
- **Docker run**: Serves the built app via Nginx on port 80 (mapped to 3002 on host)
- See `DEPLOY.md` for detailed deployment instructions
