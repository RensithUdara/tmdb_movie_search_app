import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { getPopularMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import './MovieDetails.css'; // We'll reuse some styles from MovieDetails.css

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(1);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages) return;
    
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await getPopularMovies(nextPage);
      
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popular-page">
      <div className="popular-header">
        <h1>Popular Movies</h1>
        <p>Discover the most popular movies right now</p>
      </div>
      
      <MovieList movies={movies} loading={loading && movies.length === 0} />
      
      {movies.length > 0 && currentPage < totalPages && (
        <div className="load-more">
          <button onClick={loadMoreMovies} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Popular;
