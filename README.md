
# TMDB Movie Search App

A modern, mobile-friendly web application built with React and TypeScript for searching, browsing, and viewing details of movies using the TMDB API.

## Features

- **Search Movies:** Find movies by title using the TMDB API.
- **Trending & Popular:** Browse trending and popular movies.
- **Movie Details:** View detailed information, genres, ratings, and more for each movie.
- **Responsive Design:** Optimized for mobile and desktop devices.
- **Modern UI:** Beautiful, animated, and interactive user interface.
- **Category Pills:** Quickly filter movies by genre (UI only, can be extended).
- **Color-coded Ratings:** Visual feedback for movie ratings.
- **Page Transitions & Animations:** Smooth navigation and engaging micro-interactions.

## Screenshots

![Home Page](screenshots/home.png)
![Search Results](screenshots/search.png)
![Movie Details](screenshots/details.png)

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
	```sh
	git clone https://github.com/RensithUdara/tmdb_movie_search_app.git
	cd tmdb_movie_search_app
	```

2. **Install dependencies:**
	```sh
	npm install
	```

3. **Start the development server:**
	```sh
	npm start
	```
	The app will open at [http://localhost:3000](http://localhost:3000)

## Usage

- Use the search bar to find movies by title.
- Browse trending and popular movies on the home page.
- Click any movie card to view detailed information.
- Use navigation links to switch between Home, Search, and Popular pages.

## Project Structure

```
src/
  components/      # Reusable UI components (Header, MovieCard, MovieList, SearchBar)
  pages/           # Main pages (Home, Search, MovieDetails, Popular)
  services/        # API service for TMDB
  types/           # TypeScript types for movie data
  App.tsx          # Main app component with routing
  index.tsx        # Entry point
public/
  placeholder.jpg  # Placeholder image for missing posters
```

## Configuration

- The TMDB API key is set in `src/services/movieService.ts`.
- You can get your own API key from [TMDB](https://www.themoviedb.org/settings/api).

## Customization

- **Genres:** Category pills are UI only; you can extend them to filter movies by genre using TMDB endpoints.
- **Styling:** All styles use CSS variables for easy theming.
- **Animations:** Page transitions and component animations are built-in.

## Deployment

To build for production:
```sh
npm run build
```
The output will be in the `build/` directory, ready to deploy to any static hosting service.

## License

This project is licensed under the MIT License.

## Credits

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [React](https://react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Poppins Google Font](https://fonts.google.com/specimen/Poppins)

---

Enjoy discovering movies with TMDB Movie Search App!

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
