import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((value) => {
      setPopularMovies(value);
    });
  }, []);

  async function search(q) {
    if (q.length > 4) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  }

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React-MovieDB</h1>
        <input
          type="text"
          placeholder="Cari Film"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
