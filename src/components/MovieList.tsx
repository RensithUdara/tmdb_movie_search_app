import React, { useEffect, useState, useRef } from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  title?: string;
  loading?: boolean;
  scrollable?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ 
  movies, 
  title, 
  loading = false,
  scrollable = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="movie-list-container" ref={containerRef}>
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
      <div className="movie-list-container" ref={containerRef}>
        {title && <h2 className="section-title">{title}</h2>}
        <div className="no-movies">
          <p>No movies found.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`movie-list-container ${scrollable ? 'scrollable' : ''}`} 
      ref={containerRef}
    >
      {title && <h2 className="section-title">{title}</h2>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div 
            className="movie-item" 
            key={movie.id}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
