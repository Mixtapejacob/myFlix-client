import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "react-bootstrap";

export const FavoriteMovies = () => {
  return (
    <Row>
      <Col md={12}>
        <h3>My Favorites</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.id} md={4}>
              <Link to={`/movies/${movie.Title}`} />
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies.includes(movie.Title)}
              />
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};
