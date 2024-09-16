import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StatusFilter from '../components/StatusFilter';

test('calls onFilter when selecting a status', () => {
  const mockOnFilter = jest.fn();
  const { getByRole } = render(<StatusFilter onFilter={mockOnFilter} />);

  const select = getByRole('combobox');
  fireEvent.change(select, { target: { value: 'alive' } });

  expect(mockOnFilter).toHaveBeenCalledWith('alive');
});
