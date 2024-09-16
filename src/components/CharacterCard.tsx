import React from 'react';
import { Character } from '../types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

interface Props {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <Card>
      <Link to={`/character/${character.id}`}>
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
      </Link>
    </Card>
  );
};

export default CharacterCard;
