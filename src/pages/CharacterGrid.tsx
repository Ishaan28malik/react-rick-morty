import React, { useEffect, useState } from 'react';
import { getCharacters } from '../services/api';
import { Character } from '../types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import CharacterCard from '../components/CharacterCard';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 0;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const NavAndFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      gap: 0.5rem;
    }
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`;

const StatusFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const CharacterGrid: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
    setHasMore(true);
  }, [search, filters]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const params = {
          name: search || undefined,
          page: page,
          ...filters,
        };

        const response = await getCharacters(params);
        const newCharacters = response.data.results;

        setCharacters((prevCharacters) =>
          page === 1 ? newCharacters : [...prevCharacters, ...newCharacters]
        );

        if (!response.data.info.next) {
          setHasMore(false);
        }
      } catch (error) {
        // Handle error
        setHasMore(false);
      }
    };

    fetchCharacters();
  }, [page, search, filters]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div data-testid="character-grid">
      <HeaderContainer>
        <h1>Welcome to the Show!</h1>
        <SearchBarWrapper>
          <SearchBar onSearch={(value) => setSearch(value)} />
        </SearchBarWrapper>
        <NavAndFilterWrapper>
          <Nav>
            <ul>
              <li>
                <Link to="/locations">Browse Locations</Link>
              </li>
              <li>
                <Link to="/episodes">Browse Episodes</Link>
              </li>
            </ul>
          </Nav>
          <StatusFilterWrapper>
            <StatusFilter
              onFilter={(value) => setFilters({ ...filters, status: value })}
            />
          </StatusFilterWrapper>
        </NavAndFilterWrapper>
      </HeaderContainer>
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<HeaderContainer>Loading...</HeaderContainer>}
        endMessage={<p>No more characters to display.</p>}
      >
        <GridContainer>
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </GridContainer>
      </InfiniteScroll>
    </div>
  );
};

export default CharacterGrid;
