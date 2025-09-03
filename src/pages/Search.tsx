import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import './Search.css';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(query, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, currentPage]);

  const handleSearch = (newQuery: string) => {
    setCurrentPage(1);
    setSearchParams({ query: newQuery });
  };

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages) return;
    
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await searchMovies(query, nextPage);
      
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Movies</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="search-results">
        {query && (
          <h2 className="search-results-title">
            {movies.length > 0 
              ? `Search results for "${query}"`
              : `No results found for "${query}"`}
          </h2>
        )}
        
        <MovieList movies={movies} loading={loading && movies.length === 0} />
        
        {movies.length > 0 && currentPage < totalPages && (
          <div className="load-more">
            <button onClick={loadMoreMovies} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
