import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://rickandmortyapi.com/api';

export const getCharacters = (params: {
  name: string | undefined;
  page: number;
}) => axios.get(`${API_BASE_URL}/character`, { params });

export const getCharacterById = (id: number) =>
  axios.get(`${API_BASE_URL}/character/${id}`);

export const getLocationByUrl = (url: string) => axios.get(url);

export const getEpisodeByUrl = (url: string) => axios.get(url);

export const getLocations = async (params: {
  name: string | undefined;
  page: number;
}) => {
  return await axios.get(`${API_BASE_URL}/location`, { params });
};

export const getEpisodes = async (params: {
  name: string | undefined;
  page: number;
}) => {
  return await axios.get(`${API_BASE_URL}/episode`, { params });
};
