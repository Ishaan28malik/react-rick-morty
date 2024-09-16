import React, { useEffect, useState } from 'react';
import { Episode } from '../types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/SearchBar';
import EpisodeCard from '../components/EpisodeCard';
import { useNavigate } from 'react-router-dom';
import { getEpisodes } from '../services/api';

const EpisodeGridContainer = styled.div`
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
  margin-top: 2rem;

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

const EpisodeGrid: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setEpisodes([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const params = {
          name: search || undefined,
          page: page,
        };

        const response = await getEpisodes(params);
        const newEpisodes = response.data.results;

        setEpisodes((prevEpisodes) =>
          page === 1 ? newEpisodes : [...prevEpisodes, ...newEpisodes]
        );

        if (!response.data.info.next) {
          setHasMore(false);
        }
      } catch (error) {
        // Handle error
        setHasMore(false);
      }
    };

    fetchEpisodes();
  }, [page, search]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <EpisodeGridContainer data-testid="episode-grid">
      <BackButton onClick={handleBackClick}>Back</BackButton>
      <HeaderContainer>
        <PageHeader>Episode Based Cards</PageHeader>
        <SearchBarWrapper>
          <SearchBar onSearch={(value) => setSearch(value)} />
        </SearchBarWrapper>
      </HeaderContainer>
      <InfiniteScroll
        dataLength={episodes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more episodes to display.</p>}
      >
        <GridContainer>
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </GridContainer>
      </InfiniteScroll>
    </EpisodeGridContainer>
  );
};

export default EpisodeGrid;
