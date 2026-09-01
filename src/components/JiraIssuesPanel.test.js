import { render, screen } from '@testing-library/react';
import JiraIssuesPanel from './JiraIssuesPanel';

test('renders all linked issue labels including failure 3', () => {
  render(<JiraIssuesPanel />);
  expect(screen.getByText(/failure 1/i)).toBeInTheDocument();
  expect(screen.getByText(/failure 2/i)).toBeInTheDocument();
  expect(screen.getByText(/failure 3/i)).toBeInTheDocument();
});
