import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

describe('App header', () => {
  it('renders the literal "testRigor header" text in the header', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(<App />);
    expect(markup).toContain('testRigor header');
  });

  it('preserves the existing "Pokemon Explorer" branding', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(<App />);
    expect(markup).toContain('Pokemon Explorer');
  });

  it('renders "hi codeCake" text on the page', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(<App />);
    expect(markup).toContain('hi codeCake');
  });
});
