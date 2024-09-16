import React, { useEffect, useState } from 'react';
import { Location, Character } from '../types';
import styled from 'styled-components';
import { getCharacterById } from '../services/api';

interface LocationCardProps {
  location: Location;
}

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  margin-bottom: 2rem;
  max-height: 25rem;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  max-height: 10rem;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

const CharacterImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterPromises = location.residents.map(
          (residentUrl: string) => {
            const id = residentUrl.split('/').pop();
            return getCharacterById(Number(id));
          }
        );

        const characterResponses = await Promise.all(characterPromises);
        const fetchedCharacters = characterResponses.map(
          (response) => response.data
        );
        setCharacters(fetchedCharacters);
      } catch (error) {
        // Handle error
      }
    };

    fetchCharacters();
  }, [location.residents]);

  return (
    <Card>
      <h3>{location.name}</h3>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      {characters.length > 0 && (
        <>
          <h4>Residents:</h4>
          <CharactersContainer>
            {characters.map((character) => (
              <CharacterImage
                key={character.id}
                src={character.image}
                alt={character.name}
                title={character.name}
              />
            ))}
          </CharactersContainer>
        </>
      )}
    </Card>
  );
};

export default LocationCard;
