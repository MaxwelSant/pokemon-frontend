import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
import AppTitle from './components/AppTitle';
import ActiveFilterChips from './components/ActiveFilterChips';
import FilterActions from './components/FilterActions';
import SavedFilters from './components/SavedFilters';
import ErrorBoundary from './components/ErrorBoundary';
import ViewControls from './components/ViewControls';
import Pagination from './components/Pagination';
import PokemonCompare from './components/PokemonCompare';
import RecentSearches from './components/RecentSearches';
import {
  DEFAULT_FILTERS,
  applyFilters,
  buildSearchFromFilters,
  normalizeFilters,
  parseFiltersFromSearch
} from './utils/pokemonFilters';
import { DEFAULT_SORT, normalizeSort, sortPokemons } from './utils/sortPokemons';
import {
  DEFAULT_PAGE_SIZE,
  clampPage,
  getTotalPages,
  normalizePageSize,
  paginate
} from './utils/pagination';
import { loadFavorites, persistFavorites, toggleFavoriteId } from './utils/favorites';
import { toggleCompareId } from './utils/compare';
import { addRecentSearch, loadRecentSearches, persistRecentSearches } from './utils/recentSearches';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const RECENT_SEARCH_DEBOUNCE_MS = 1000;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  // Initial filters come from the URL so shared links restore the same view
  const [filters, setFilters] = useState(() => parseFiltersFromSearch(window.location.search));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavorites());
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => loadRecentSearches());

  // Fetch all Pokemon and types on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const [pokemonResponse, typesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/pokemons`),
          fetch(`${API_BASE_URL}/api/types`)
        ]);

        if (!pokemonResponse.ok || !typesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const pokemonData = await pokemonResponse.json();
        const typesData = await typesResponse.json();

        setPokemons(pokemonData.data);
        setFilteredPokemons(pokemonData.data);
        setTypes(typesData.data);
        setError(null);
      } catch (err) {
        setError('Failed to load Pokemon data. Please make sure the backend server is running.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    setFilteredPokemons(applyFilters(pokemons, filters));
  }, [filters, pokemons]);

  // Keep the address bar in sync so the current view is shareable
  useEffect(() => {
    const search = buildSearchFromFilters(filters);
    if (search !== window.location.search) {
      const { pathname, hash } = window.location;
      window.history.replaceState(window.history.state, '', `${pathname}${search}${hash}`);
    }
  }, [filters]);

  const shareUrl = useMemo(
    () => `${window.location.origin}${window.location.pathname}${buildSearchFromFilters(filters)}`,
    [filters]
  );

  // NOTE: every hook must stay above the early returns below; a conditional hook would crash
  // the render and unmount the whole tree, including the header.

  // Persist per-browser favorites and recent searches whenever they change
  useEffect(() => {
    persistFavorites(favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    persistRecentSearches(recentSearches);
  }, [recentSearches]);

  // Record the name search once the user stops typing
  useEffect(() => {
    const term = filters.name.trim();
    if (!term) {
      return undefined;
    }
    const timer = setTimeout(() => {
      setRecentSearches((prev) => addRecentSearch(prev, term));
    }, RECENT_SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filters.name]);

  // Current view = filters (existing) -> favorites-only -> sort; pagination slices it for display
  const viewPokemons = useMemo(() => {
    const base = favoritesOnly
      ? filteredPokemons.filter((pokemon) => favoriteIds.includes(pokemon.id))
      : filteredPokemons;
    return sortPokemons(base, sort);
  }, [filteredPokemons, favoritesOnly, favoriteIds, sort]);

  const totalPages = getTotalPages(viewPokemons.length, pageSize);
  const safePage = clampPage(currentPage, totalPages);
  const pagePokemons = useMemo(
    () => paginate(viewPokemons, safePage, pageSize),
    [viewPokemons, safePage, pageSize]
  );

  // Go back to the first page whenever the result set definition changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort, pageSize, favoritesOnly]);

  const comparedPokemons = useMemo(
    () => compareIds.map((id) => pokemons.find((pokemon) => pokemon.id === id)).filter(Boolean),
    [compareIds, pokemons]
  );

  const exportView = useMemo(() => ({ filters, sort, favoritesOnly }), [filters, sort, favoritesOnly]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
  };

  const handleRemoveFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: DEFAULT_FILTERS[key] }));
  };

  const handleApplySavedFilter = (savedFilters) => {
    setFilters(normalizeFilters(savedFilters));
  };

  const handleToggleFavorite = (id) => {
    setFavoriteIds((prev) => toggleFavoriteId(prev, id));
  };

  const handleToggleCompare = (id) => {
    setCompareIds((prev) => toggleCompareId(prev, id));
  };

  const handleClearCompare = () => {
    setCompareIds([]);
  };

  const handleSelectRecentSearch = (term) => {
    setFilters((prev) => ({ ...prev, name: term }));
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Pokemon Explorer</h1>
          <AppTitle />
        </header>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Pokemon Explorer</h1>
          <AppTitle />
        </header>
        <div className="error-container">
          <div className="error-message">
            <h2>⚠️ Connection Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokemon Explorer v2</h1>
        <AppTitle />
        <p>Discover and filter your favorite Pokemon!</p>
        <div className="header-actions">
          <button className="jira-link-button">Link Jira Issue</button>
        </div>
      </header>

      <ErrorBoundary>
        <main className="main-content">
          <FilterBar
            filters={filters}
            types={types}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <ActiveFilterChips filters={filters} onRemoveFilter={handleRemoveFilter} />

          <RecentSearches
            searches={recentSearches}
            onSelect={handleSelectRecentSearch}
            onClear={handleClearRecentSearches}
          />

          <ViewControls
            sort={sort}
            pageSize={pageSize}
            favoritesOnly={favoritesOnly}
            favoritesCount={favoriteIds.length}
            onSortChange={(value) => setSort(normalizeSort(value))}
            onPageSizeChange={(value) => setPageSize(normalizePageSize(value))}
            onFavoritesOnlyChange={setFavoritesOnly}
          />

          <div className="results-info" role="status" aria-live="polite">
            <p>
              Showing {viewPokemons.length} of {pokemons.length} Pokemon
            </p>
          </div>

          <FilterActions filteredPokemons={viewPokemons} shareUrl={shareUrl} exportView={exportView} />

          <SavedFilters filters={filters} onApplyFilter={handleApplySavedFilter} />

          <PokemonCompare
            selected={comparedPokemons}
            onRemove={handleToggleCompare}
            onClear={handleClearCompare}
          />

          {viewPokemons.length === 0 ? (
            <div className="no-results">
              <h3>No Pokemon found</h3>
              <p>
                {favoritesOnly
                  ? 'No favorite Pokemon match the current filters. Mark Pokemon as favorites or turn off "Show favorites only".'
                  : 'Try adjusting your filters to see more results.'}
              </p>
              <button onClick={clearFilters} className="clear-button">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="pokemon-grid">
                {pagePokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    isFavorite={favoriteIds.includes(pokemon.id)}
                    onToggleFavorite={handleToggleFavorite}
                    isCompared={compareIds.includes(pokemon.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
              <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
