import { useState, useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../book card/book-card";
import { MovieView } from "../book view/book-view";
import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4MTBlOTFkMzUyNzdiNWY0Y2NkNjMiLCJVc2VybmFtZSI6ImpvbmRvZTIiLCJQYXNzd29yZCI6IiQyYiQxMCRlSFB0RWZ3b1VNQnNOTHNROG5meHJ1MUZNc2piR08xbEkxVnJXZzFnTUl3NDQyR0RaWlBnaSIsIkVtYWlsIjoiam9uZG9lMkBtYWlsLmNvbSIsIkJpcnRoZGF5IjoiMjAwMS0wMS0wMVQwMDowMDowMC4wMDBaIiwiRmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxMjg1MzIzMiwiZXhwIjoxNzEzNDU4MDMyLCJzdWIiOiJqb25kb2UyIn0.AfZ_2e7I0yH8mEEVHzg-c7V0PIgkz07f48flYEtUbr4";
    fetch("https://movie-api-ul5k.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
                Name: movie.Genre.Name
            },
            Director: {
                Name: movie.Director.Name
            }
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);


  if (selectedBook) {
    return <MovieView movie={selectedBook} onBackClick={() => setSelectedBook(null)} />
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
      {movies.map((movie) => (
        <MovieCard
        key={movie._id}
        movie={movie}
        onMovieClick={(newSelectedBook) => {
          setSelectedBook(newSelectedBook);
        }}
      />
      ))}
    </div>
  );
};