import React from 'react';
import './JiraIssuesPanel.css';

const LINKED_ISSUES = [
  { id: 'PROJ-101', label: 'failure 1' },
  { id: 'PROJ-102', label: 'failure 2' },
  { id: 'PROJ-103', label: 'failure 3' }
];

const JiraIssuesPanel = () => {
  return (
    <div className="jira-issues-panel">
      <p id="jira-issues-title" className="jira-issues-title">Linked Jira Issues:</p>
      <ul className="jira-issues-list" aria-labelledby="jira-issues-title">
        {LINKED_ISSUES.map(issue => (
          <li key={issue.id} className="jira-issue-item">
            {issue.id}: {issue.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JiraIssuesPanel;
