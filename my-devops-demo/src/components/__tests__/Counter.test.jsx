import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

test('tăng số khi nhấn nút', () => {
  render(<Counter />);
  const button = screen.getByText('Tăng');
  fireEvent.click(button);
  expect(screen.getByText('Số: 1')).toBeInTheDocument();
});