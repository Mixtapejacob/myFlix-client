import { useState, useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../book-card/book-card";
import { MovieView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4MTBlOTFkMzUyNzdiNWY0Y2NkNjMiLCJVc2VybmFtZSI6ImpvbmRvZTIiLCJQYXNzd29yZCI6IiQyYiQxMCRlSFB0RWZ3b1VNQnNOTHNROG5meHJ1MUZNc2piR08xbEkxVnJXZzFnTUl3NDQyR0RaWlBnaSIsIkVtYWlsIjoiam9uZG9lMkBtYWlsLmNvbSIsIkJpcnRoZGF5IjoiMjAwMS0wMS0wMVQwMDowMDowMC4wMDBaIiwiRmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxMzgyNDAxMiwiZXhwIjoxNzE0NDI4ODEyLCJzdWIiOiJqb25kb2UyIn0.sX6ccfm0uKcVgJsjKKulMoWwaDWA3jYjJod106VSuBU";
    fetch("https://movie-api-ul5k.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            ...movie
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);


  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
 

  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((m) => (
        <MovieCard
        key={m._id}
        m={m}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      ))}
    </div>
  );
};
