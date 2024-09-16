import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterProfile from '../components/CharacterProfile';

jest.mock('../services/api', () => ({
  getCharacterById: jest.fn(),
  getLocationByUrl: jest.fn(),
  getEpisodeByUrl: jest.fn(),
}));

test('renders CharacterProfile component with loading state', () => {
  render(
    <MemoryRouter initialEntries={['/character/1']}>
      <Routes>
        <Route path="/character/:id" element={<CharacterProfile />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
