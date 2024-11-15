import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie] = useState(movies.find((b) => b.id == movieId));

  return (
    <div>
      <div>
        <img
          src={location.href.split("/movies")[0] + "/" + movie.ImagePath}
          width="250"
          height="250"
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <Link to="/">
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};
