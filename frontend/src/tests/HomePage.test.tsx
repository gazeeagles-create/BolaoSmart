import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renderiza página inicial', () => {
  render(<HomePage />);
  const headerElement = screen.getByText(/Bem-vindo ao BolaoSmart!/i);
  expect(headerElement).toBeInTheDocument();
});
