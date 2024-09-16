import { BrowserRouter } from 'react-router-dom';
import CharacterGrid from '../pages/CharacterGrid';
import { render } from '@testing-library/react';
import React from 'react';

test('renders CharacterGrid component', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <CharacterGrid />
    </BrowserRouter>
  );

  const characterGridElement = getByTestId('character-grid');
  expect(characterGridElement).toBeInTheDocument();
});
