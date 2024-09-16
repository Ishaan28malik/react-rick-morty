import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Character, Episode, Location } from '../types';
import {
  getCharacterById,
  getEpisodeByUrl,
  getLocationByUrl,
} from '../services/api';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
  position: relative;
  @media (max-width: 768px) {
    height: auto;
    background-color: transparent;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 10px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  color: #0056b3;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    height: auto;
    box-shadow: none;
    border-radius: 0;
    padding: 0rem;
    margin-top: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Subheading = styled.h2`
  font-size: 1.25rem;
  color: #007bff;
  margin-bottom: 0.25rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

const DetailsText = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.4rem;
  }
`;

const EpisodeListContainer = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding-right: 0.5rem;
  width: 15rem;

  ul {
    padding-left: 1rem;
  }

  @media (max-width: 768px) {
    max-height: 100px;
    padding: 0px 16px;
    max-width: 12rem;
    border: 1px solid lightgray;
  }
`;

const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [originDetails, setOriginDetails] = useState<Location | null>(null);
  const [locationDetails, setLocationDetails] = useState<Location | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await getCharacterById(Number(id));
        setCharacter(response.data);
        if (response.data.origin.url) {
          const originRes = await getLocationByUrl(response.data.origin.url);
          setOriginDetails(originRes.data);
        }

        if (response.data.location.url) {
          const locationRes = await getLocationByUrl(
            response.data.location.url
          );
          setLocationDetails(locationRes.data);
        }

        const episodePromises = response.data.episode.map((url: string) =>
          getEpisodeByUrl(url)
        );
        const episodesData = await Promise.all(episodePromises);
        setEpisodes(episodesData.map((ep) => ep.data));
      } catch (error) {
        // Handle error
      }
    };
    fetchCharacter();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!character) return <ProfileWrapper>Loading...</ProfileWrapper>;

  return (
    <ProfileWrapper>
      <BackButton onClick={handleBack}>Back</BackButton>
      <ProfileContainer>
        <Title>Character Profile</Title>
        <ProfileImage src={character.image} alt={character.name} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Subheading>{character.name}</Subheading>
          <DetailsText>Status: {character.status}</DetailsText>
          <DetailsText>Species: {character.species}</DetailsText>

          <Subheading>Origin Details</Subheading>
          {originDetails ? (
            <DetailsText>Name: {originDetails.name}</DetailsText>
          ) : (
            <DetailsText>No Origin Details Available</DetailsText>
          )}

          <Subheading>Current Location Details</Subheading>
          {locationDetails ? (
            <DetailsText>Name: {locationDetails.name}</DetailsText>
          ) : (
            <DetailsText>No Location Details Available</DetailsText>
          )}

          <Subheading>Episodes Featured In</Subheading>
        </div>
        <EpisodeListContainer>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>{episode.name}</li>
            ))}
          </ul>
        </EpisodeListContainer>
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default CharacterProfile;
