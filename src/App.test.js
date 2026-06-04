import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

test('App header contains the testRigor header label', () => {
  const html = ReactDOMServer.renderToStaticMarkup(<App />);
  expect(html).toContain('testRigor header');
});

test('App header preserves existing branding and Jira action', () => {
  const html = ReactDOMServer.renderToStaticMarkup(<App />);
  expect(html).toContain('Pokemon Explorer');
});

test('App renders the testRigor header label with its class on the static markup the build bundles', () => {
  const html = ReactDOMServer.renderToStaticMarkup(<App />);
  expect(html).toContain('class="testrigor-header"');
  expect(html).toContain('testRigor header');
  expect(html).toContain('<p class="testrigor-header">testRigor header</p>');
});
