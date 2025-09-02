import axios from 'axios';
import { Movie, MovieDetail, MovieSearchResponse } from '../types/movie';

const API_KEY = '67cc884deceda0099ac029e86eebea7d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes
export const posterSizes = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

export const backdropSizes = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

// Helper function to construct image URLs
export const getImageUrl = (path: string | null, size = posterSizes.medium): string => {
  if (!path) return '/placeholder.jpg'; // You'll need to add a placeholder image to public folder
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Search movies by query
export const searchMovies = async (query: string, page = 1): Promise<MovieSearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get trending movies
export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<MovieSearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/${timeWindow}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1): Promise<MovieSearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId: number): Promise<MovieDetail> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
