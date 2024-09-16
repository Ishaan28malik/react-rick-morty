import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('calls onSearch when typing in input with debounce', async () => {
  const mockOnSearch = jest.fn();
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={mockOnSearch} />
  );

  const input = getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Rick' } });

  // Wait for debounce (300ms delay)
  await waitFor(() => {
    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
