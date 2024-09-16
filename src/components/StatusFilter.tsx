import React from 'react';

interface Props {
  onFilter: (value: string) => void;
}

const StatusFilter: React.FC<Props> = ({ onFilter }) => {
  return (
    <select onChange={(e) => onFilter(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};

export default StatusFilter;
