# Pokemon Explorer v2 - Frontend Architecture

## Overview

Pokemon Explorer v2 is a React-based single-page application (SPA) that allows users to browse, search, and filter Pokemon data. It communicates with a backend REST API to fetch Pokemon information and types.

## Technology Stack

- **Framework**: React 18 with functional components and hooks
- **Styling**: CSS3 with glassmorphism design, CSS Grid, and Flexbox
- **Build Tool**: Create React App
- **Deployment**: Docker with Nginx for serving static assets
- **State Management**: React built-in hooks (`useState`, `useEffect`)

## Project Structure

```
pokemon-frontend/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── index.js                # React DOM entry point (React 18 StrictMode)
│   ├── index.css               # Global styles
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application-level styles
│   └── components/
│       ├── PokemonCard.js      # Individual Pokemon display card
│       ├── PokemonCard.css     # Card styles
│       ├── FilterBar.js        # Search and filter controls
│       ├── FilterBar.css       # Filter bar styles
│       ├── LoadingSpinner.js   # Loading indicator with Pokeball animation
│       └── LoadingSpinner.css  # Spinner styles
├── package.json                # Dependencies and scripts
├── Dockerfile                  # Docker build configuration
└── DEPLOY.md                   # Deployment instructions
```

## Component Hierarchy

```
App (root)
├── FilterBar         # Filter controls (name, type, legendary status)
├── PokemonCard[]     # Grid of Pokemon cards (rendered for each filtered Pokemon)
└── LoadingSpinner    # Shown during initial data loading
```

## Components

### App (`src/App.js`)

The root component that orchestrates the entire application.

- **State Management**: Manages all application state using `useState` hooks:
  - `pokemons` / `filteredPokemons`: Complete and filtered Pokemon lists
  - `types`: Available Pokemon types for filter dropdown
  - `filters`: Current filter criteria (name, type, legendary)
  - `loading` / `error`: Request lifecycle states
- **Data Fetching**: Uses `useEffect` to fetch Pokemon and type data from the backend API on mount
- **Filtering Logic**: Applies client-side filters (name search, type selection, legendary status) whenever filter state changes
- **Render States**: Three conditional render paths:
  1. **Loading**: Header + LoadingSpinner
  2. **Error**: Header + error message with retry button
  3. **Normal**: Header + FilterBar + results grid or empty state

### PokemonCard (`src/components/PokemonCard.js`)

A presentational component that displays individual Pokemon information.

- Renders Pokemon image with error fallback placeholder
- Displays name, ID (zero-padded), type badges (color-coded), and legendary badge
- Pure functional component with no internal state

### FilterBar (`src/components/FilterBar.js`)

Provides the user interface for filtering Pokemon.

- Text input for name search (case-insensitive)
- Dropdown for type filtering (dynamically populated)
- Dropdown for legendary status filtering
- Conditional "Clear Filters" button when filters are active
- Communicates changes to parent via `onFilterChange` callback

### LoadingSpinner (`src/components/LoadingSpinner.js`)

A simple presentational component displaying a Pokeball-style loading animation with "Loading Pokemon..." text.

## Data Flow

1. **Initialization**: `App` fetches Pokemon data and types from the backend API on mount (`/api/pokemons`, `/api/types`)
2. **User Interaction**: User sets filter criteria via `FilterBar`
3. **Filtering**: `App` applies filters client-side and updates `filteredPokemons` state
4. **Rendering**: `PokemonCard` components render for each Pokemon in the filtered list

## API Integration

The frontend communicates with the backend REST API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pokemons` | GET | Fetch all Pokemon data |
| `/api/types` | GET | Fetch all available Pokemon types |

The API base URL is configured via the `REACT_APP_API_URL` environment variable, defaulting to `http://localhost:3001`.

## Styling Approach

- **Design System**: Glassmorphism with gradient backgrounds, blurred backdrops, and semi-transparent elements
- **Layout**: CSS Grid for the Pokemon card grid, Flexbox for component layouts
- **Responsive**: Media queries for mobile adaptation (breakpoint at 768px)
- **Animations**: CSS transitions for hover effects and loading spinner
