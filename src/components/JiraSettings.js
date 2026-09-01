import React, { useState } from 'react';
import './JiraSettings.css';

/**
 * JiraSettings
 *
 * Minimal, local-state-only stub of the Jira PR-linking configuration
 * described in the Jira ticket:
 *   - "Add PR to Jira" toggle, defaulting to ON.
 *   - "Jira Field" dropdown, defaulting to "Comments".
 *
 * This component intentionally does not call any backend. The static
 * option list mirrors Jira fields that support multiple entries
 * (arrays / multi-line text), per the ticket.
 */
const JIRA_FIELD_OPTIONS = [
  { id: 'comment', name: 'Comments' },
  { id: 'description', name: 'Description' },
  { id: 'customfield_release_notes', name: 'Release Notes' },
  { id: 'customfield_acceptance_criteria', name: 'Acceptance Criteria' }
];

const JiraSettings = () => {
  const [addPrToJira, setAddPrToJira] = useState(true);
  const [jiraField, setJiraField] = useState('Comments');

  return (
    <div className="jira-settings">
      <label className="jira-settings-toggle">
        <input
          type="checkbox"
          checked={addPrToJira}
          onChange={(e) => setAddPrToJira(e.target.checked)}
          aria-label="Add PR to Jira"
        />
        <span className="jira-settings-toggle-label">Add PR to Jira</span>
      </label>

      <label className="jira-settings-field">
        <span className="jira-settings-field-label">Jira Field:</span>
        <select
          value={jiraField}
          onChange={(e) => setJiraField(e.target.value)}
          disabled={!addPrToJira}
          aria-label="Jira Field"
          className="jira-settings-select"
        >
          {JIRA_FIELD_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.name}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default JiraSettings;
