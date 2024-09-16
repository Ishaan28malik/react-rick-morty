import React, { useEffect, useState } from 'react';
import { getLocations } from '../services/api';
import { Location } from '../types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/SearchBar';
import LocationCard from '../components/LocationCard';
import { useNavigate } from 'react-router-dom';

const LocationGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

const PageHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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
    top: 1rem;
    font-size: 0.9rem;
  }
`;

const SearchBarWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LocationGrid: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLocations([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const params = {
          name: search || undefined,
          page: page,
        };

        const response = await getLocations(params);
        const newLocations = response.data.results;

        setLocations((prevLocations) =>
          page === 1 ? newLocations : [...prevLocations, ...newLocations]
        );

        if (!response.data.info.next) {
          setHasMore(false);
        }
      } catch (error) {
        // Handle error
        setHasMore(false);
      }
    };

    fetchLocations();
  }, [page, search]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <LocationGridContainer data-testid="location-grid">
      <BackButton onClick={handleBackClick}>Back</BackButton>
      <HeaderContainer>
        <PageHeader>Location Based Cards</PageHeader>
        <SearchBarWrapper>
          <SearchBar onSearch={(value) => setSearch(value)} />
        </SearchBarWrapper>
      </HeaderContainer>
      <InfiniteScroll
        dataLength={locations.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more locations to display.</p>}
      >
        <GridContainer>
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </GridContainer>
      </InfiniteScroll>
    </LocationGridContainer>
  );
};

export default LocationGrid;
