import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header Pull Requests', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pull Requests/i);
  expect(linkElement).toBeInTheDocument();
});
