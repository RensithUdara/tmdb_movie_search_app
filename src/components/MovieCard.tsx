import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { getImageUrl, posterSizes } from '../services/movieService';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster">
          <img 
            src={getImageUrl(movie.poster_path, posterSizes.medium)} 
            alt={`${movie.title} poster`} 
          />
          <div className="movie-rating">
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">{releaseYear}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
