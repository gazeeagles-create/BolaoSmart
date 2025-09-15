import { render, screen } from '@testing-library/react';
import BolaoCard from '../components/BolaoCard';

test('renderiza o card do bolão', () => {
  render(<BolaoCard />);
  const linkElement = screen.getByText(/Entrar no Bolão/i);
  expect(linkElement).toBeInTheDocument();
});
