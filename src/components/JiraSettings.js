import React, { useState, useEffect } from 'react';
import './JiraSettings.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Safe fallback list used when the Jira fields API is not reachable.
// Limited to fields that naturally support multiple entries (comments, multi-line
// text / textarea) so the list always matches the ticket requirement.
const FALLBACK_FIELDS = [
  { id: 'comment', name: 'Comments' },
  { id: 'description', name: 'Description' },
  { id: 'customfield_release_notes', name: 'Release Notes' },
  { id: 'customfield_acceptance_criteria', name: 'Acceptance Criteria' },
];

const DEFAULT_FIELD = { id: 'comment', name: 'Comments' };

// Decide whether a Jira field supports multiple entries. The ticket says:
// "The only fields shown should be ones that support multiple entries
//  (arrays and multi-line text fields)".
function supportsMultipleEntries(field) {
  if (!field) return false;

  // Comments are always multi-entry (a new comment is appended each time).
  if (field.id === 'comment' || field.key === 'comment') return true;

  const schema = field.schema || {};
  const schemaType = (schema.type || '').toLowerCase();
  const topLevelType = (field.type || '').toLowerCase();
  const custom = (schema.custom || field.custom || '').toLowerCase();

  // Arrays (labels, components, multi-select custom fields, etc.)
  if (schemaType === 'array' || topLevelType === 'array') return true;

  // Multi-line / textarea style fields (description, release notes, etc.)
  if (
    custom.includes('textarea') ||
    custom.includes('multi-line') ||
    custom.includes('multiline') ||
    custom.includes('multi')
  ) {
    return true;
  }

  return false;
}

// Guarantee the "Comments" entry is present so the default selection always resolves
// to a real option. If the API omits it we prepend our canonical Comments entry.
function ensureCommentsEntry(fields) {
  const hasComments = fields.some(
    (f) => f.id === 'comment' || f.key === 'comment'
  );
  if (hasComments) return fields;
  return [DEFAULT_FIELD, ...fields];
}

function normalizeField(field) {
  // The Jira REST API uses `id`, but some shapes expose `key` instead.
  return {
    id: field.id || field.key,
    name: field.name || field.id || field.key,
  };
}

function JiraSettings() {
  const [addPrToJira, setAddPrToJira] = useState(true);
  const [selectedField, setSelectedField] = useState(DEFAULT_FIELD);
  const [fields, setFields] = useState(FALLBACK_FIELDS);

  useEffect(() => {
    let cancelled = false;

    const loadFields = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jira/fields`);
        if (!response.ok) {
          throw new Error(`Failed to load Jira fields: ${response.status}`);
        }
        const payload = await response.json();
        // Accept both `{ data: [...] }` and a bare array, to match the patterns
        // already used in the rest of this app.
        const raw = Array.isArray(payload) ? payload : payload.data || [];

        const filtered = raw
          .filter(supportsMultipleEntries)
          .map(normalizeField)
          .filter((f) => f.id);

        if (cancelled) return;

        const finalList = ensureCommentsEntry(filtered);
        setFields(finalList);
      } catch (err) {
        // Silently fall back to the static list so the UI is never empty.
        // eslint-disable-next-line no-console
        console.warn('JiraSettings: falling back to static field list.', err);
        if (!cancelled) {
          setFields(FALLBACK_FIELDS);
        }
      }
    };

    loadFields();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggleChange = (event) => {
    setAddPrToJira(event.target.checked);
  };

  const handleFieldChange = (event) => {
    const { value } = event.target;
    const match = fields.find((f) => f.id === value);
    if (match) {
      // Store BOTH id and name: the id is what the backend uses to update the
      // field, the name is what we display to the user.
      setSelectedField({ id: match.id, name: match.name });
    }
  };

  return (
    <div className="jira-settings" aria-label="Jira PR Settings">
      <label className="jira-settings__toggle">
        <input
          type="checkbox"
          className="jira-settings__checkbox"
          checked={addPrToJira}
          onChange={handleToggleChange}
          aria-label="Add PR to Jira"
        />
        <span className="jira-settings__toggle-label">Add PR to Jira</span>
      </label>

      <label className="jira-settings__field">
        <span className="jira-settings__field-label">Jira Field</span>
        <select
          className="jira-settings__select"
          value={selectedField.id}
          onChange={handleFieldChange}
          disabled={!addPrToJira}
          aria-label="Jira Field"
        >
          {fields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default JiraSettings;
