import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

describe('App Jira link status', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/jira-status')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: false, attempts: 1, message: 'Jira integration is not configured (failure 1)' }) });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true, data: [] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true, data: [] }) });
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.resetAllMocks();
  });

  test('renders the Jira link failure status on mount with no user interaction', async () => {
    await act(async () => {
      createRoot(container).render(<App />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(container.textContent).toMatch(/failure 1/i);
  });

  test('clicking "Link Jira Issue" posts the entered issue key and updates the status message', async () => {
    window.prompt = jest.fn(() => 'PROJ-123');
    await act(async () => {
      createRoot(container).render(<App />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const button = Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Link Jira Issue');
    await act(async () => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/jira-link'), expect.objectContaining({ method: 'POST' }));
  });
});
