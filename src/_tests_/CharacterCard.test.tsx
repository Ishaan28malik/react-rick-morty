import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import '@testing-library/jest-dom';

test('renders CharacterCard with correct information', () => {
  const mockCharacter = {
    id: 1,
    name: 'John Doe',
    image: 'https://example.com/image.jpg',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      id: '1',
      name: 'Earth',
      url: '',
      type: '',
      dimension: '',
      residents: [],
    },
    location: {
      id: '1',
      name: 'Earth',
      url: '',
      type: '',
      dimension: '',
      residents: [],
    },
    episode: [],
    url: '',
    created: '',
  };

  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <CharacterCard character={mockCharacter} />
    </MemoryRouter>
  );

  expect(getByText(/John Doe/i)).toBeInTheDocument();
  expect(getByAltText(/John Doe/i)).toBeInTheDocument();
});
