import React, { useEffect, useState } from 'react';
import './FilterActions.css';
import { pokemonsToCsv, downloadCsv } from '../utils/csvExport';
import { pokemonsToJson, downloadJson } from '../utils/jsonExport';
import { copyTextToClipboard } from '../utils/clipboard';

const STATUS_MESSAGE_TIMEOUT_MS = 4000;

const FilterActions = ({ filteredPokemons, shareUrl, exportView }) => {
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }
    const timer = setTimeout(() => setStatusMessage(''), STATUS_MESSAGE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const handleExportCsv = () => {
    downloadCsv(pokemonsToCsv(filteredPokemons), 'pokemon-export.csv');
    setStatusMessage(`Exported ${filteredPokemons.length} Pokemon to CSV`);
  };

  const handleExportJson = () => {
    downloadJson(pokemonsToJson(filteredPokemons, exportView), 'pokemon-export.json');
    setStatusMessage(`Exported ${filteredPokemons.length} Pokemon to JSON`);
  };

  const handleCopyShareUrl = async () => {
    const copied = await copyTextToClipboard(shareUrl);
    setStatusMessage(
      copied
        ? 'Shareable URL copied to clipboard'
        : 'Could not copy automatically. Copy the URL from the address bar.'
    );
  };

  return (
    <div className="filter-actions">
      <button
        type="button"
        className="action-button"
        onClick={handleExportCsv}
        disabled={filteredPokemons.length === 0}
      >
        Export CSV
      </button>
      <button
        type="button"
        className="action-button"
        onClick={handleExportJson}
        disabled={filteredPokemons.length === 0}
      >
        Export JSON
      </button>
      <button type="button" className="action-button" onClick={handleCopyShareUrl}>
        Copy shareable URL
      </button>
      <p className="filter-actions-status" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </div>
  );
};

export default FilterActions;
