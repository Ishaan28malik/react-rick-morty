import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search ....."
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
