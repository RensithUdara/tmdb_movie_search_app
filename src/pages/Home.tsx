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
  const [activeCategory, setActiveCategory] = useState('all');

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

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Here you could filter movies based on category or fetch new data
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        {/* Decorative elements */}
        <div className="hero-decoration decoration-1"></div>
        <div className="hero-decoration decoration-2"></div>
        
        <div className="hero-content">
          <h1>Discover Amazing Movies</h1>
          <p>
            Explore thousands of movies, from blockbuster hits to indie gems.
            Find what to watch next with our curated collections.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="featured-categories">
        <div 
          className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('all')}
        >
          All
        </div>
        <div 
          className={`category-pill ${activeCategory === 'action' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('action')}
        >
          Action
        </div>
        <div 
          className={`category-pill ${activeCategory === 'comedy' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('comedy')}
        >
          Comedy
        </div>
        <div 
          className={`category-pill ${activeCategory === 'drama' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('drama')}
        >
          Drama
        </div>
        <div 
          className={`category-pill ${activeCategory === 'sci-fi' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('sci-fi')}
        >
          Sci-Fi
        </div>
      </div>

      <div className="content-container">
        <MovieList 
          movies={trendingMovies} 
          title="Trending This Week" 
          loading={loading}
          scrollable={true}
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
