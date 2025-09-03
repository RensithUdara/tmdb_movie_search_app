import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getImageUrl, posterSizes, backdropSizes } from '../services/movieService';
import { MovieDetail } from '../types/movie';
import './MovieDetails.css';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(parseInt(id));
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loader"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-error">
        <h2>Error</h2>
        <p>{error || 'Movie not found'}</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    );
  }

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';
    
  const runtimeFormatted = movie.runtime 
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` 
    : 'N/A';

  return (
    <div className="movie-details">
      <div 
        className="movie-backdrop" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${getImageUrl(movie.backdrop_path, backdropSizes.original)}')`
        }}
      >
        <div className="movie-details-content">
          <div className="movie-poster-container">
            <img 
              src={getImageUrl(movie.poster_path, posterSizes.large)} 
              alt={`${movie.title} poster`}
              className="movie-poster" 
            />
          </div>
          
          <div className="movie-info-container">
            <h1 className="movie-title">
              {movie.title} <span className="movie-year">({releaseYear})</span>
            </h1>
            
            {movie.tagline && (
              <p className="movie-tagline">{movie.tagline}</p>
            )}
            
            <div className="movie-meta">
              <span className="movie-rating">
                <strong>★ {movie.vote_average.toFixed(1)}</strong>/10
              </span>
              <span className="movie-runtime">{runtimeFormatted}</span>
              <span className="movie-release">{movie.release_date}</span>
            </div>
            
            <div className="movie-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            
            <div className="additional-info">
              <div className="info-item">
                <h4>Status</h4>
                <p>{movie.status}</p>
              </div>
              <div className="info-item">
                <h4>Original Language</h4>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
              <div className="info-item">
                <h4>Budget</h4>
                <p>{movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
              </div>
              <div className="info-item">
                <h4>Revenue</h4>
                <p>{movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</p>
              </div>
            </div>
            
            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="movie-homepage-link"
              >
                Visit Official Site
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="back-navigation">
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default MovieDetails;
