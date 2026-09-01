import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

// Mock fetch so the initial data-fetch useEffect resolves and the main view renders.
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

function findButtonByText(container, text) {
  return Array.from(container.querySelectorAll('button')).find(
    btn => btn.textContent.trim() === text
  );
}

test("renders a <button> labeled 'Share' in the main view after data load", async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App />);
  });

  const shareButton = findButtonByText(container, 'Share');
  expect(shareButton).toBeTruthy();
  expect(shareButton.tagName).toBe('BUTTON');

  await act(async () => {
    root.unmount();
  });
  document.body.removeChild(container);
});

test("still renders the existing 'Link Jira Issue' button (no regression)", async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App />);
  });

  const jiraButton = findButtonByText(container, 'Link Jira Issue');
  expect(jiraButton).toBeTruthy();
  expect(jiraButton.tagName).toBe('BUTTON');

  await act(async () => {
    root.unmount();
  });
  document.body.removeChild(container);
});
