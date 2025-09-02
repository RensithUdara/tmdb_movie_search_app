import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { getTrendingMovies, getPopularMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData] = await Promise.all([
          getTrendingMovies('week'),
          getPopularMovies()
        ]);
        
        setTrendingMovies(trendingData.results);
        setPopularMovies(popularData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Movies</h1>
          <p>Search for your favorite movies and discover new ones</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="content-container">
        <MovieList 
          movies={trendingMovies} 
          title="Trending This Week" 
          loading={loading}
        />
        
        <MovieList 
          movies={popularMovies} 
          title="Popular Movies" 
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;
