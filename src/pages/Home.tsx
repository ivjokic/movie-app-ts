import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import { useState, useEffect } from "react";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};
function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setMovies(movies);
      } catch (error) {
        console.log("Greska se desila!");
        setError("greska");
      } finally {
        console.log("sve je ucitano");
        setLoading(false);
      }
    };

    loadMovies();
  }, []);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError("");
    } catch (error) {
      console.log("Greska se desila!");
      setError("greska");
    } finally {
      console.log("sve je ucitano");
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {!loading && (
        <div className="movies-grid">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
