import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  title?: string;
  loading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, title, loading = false }) => {
  if (loading) {
    return (
      <div className="movie-list-container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="movie-list-loading">
          <div className="loader"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="movie-list-container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="no-movies">
          <p>No movies found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
