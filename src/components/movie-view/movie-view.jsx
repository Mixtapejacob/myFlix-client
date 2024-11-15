import "./movie-view.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export const MovieView = ({ onBackClick }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    fetch("https://movie-api-ul5k.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api: ", data);
        const d = data.find((m) => m.Title === movieId);
        setMovie(d);
      });
  }, [movie]);
console.log(movie)
if (!movie) return <>Not found</>;
  return (
    <div>
      <div>
        <img src={location.origin+"/"+movie.ImagePath} w-100 />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <button
        onClick={goBack}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};
