import { render, screen } from '@testing-library/react';
import Welcome from '../Welcome';

test('hiển thị tên người dùng', () => {
  render(<Welcome user="Long" />);
  expect(screen.getByText('Chào mừng, Long!')).toBeInTheDocument();
});
