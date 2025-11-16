import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const resp = await fetch(endpoint, API_OPTIONS);
      if (!resp.ok) {
        throw new Error("Failed to fetch movies!");
      }
      const data = await resp.json();
      if (data.Response === "False") {
        setErrorMsg(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      console.log(data.Response);

      setMovieList(data.results || []);
    } catch (error) {
      setErrorMsg("Error when fetching movies, Please Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero" />
          <h1 className="text-4xl">
            Find the <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </section>
      </div>
    </main>
  );
}

export default App;
