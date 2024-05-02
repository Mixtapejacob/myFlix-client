
import PropType from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Director.Name}</Card.Text>
      <Button onClick={() => onMovieClick(movie)}  variant="link">
        Open
      </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropType.shape({
    Title: PropType.string.isRequired, // propType is working
    ImagePath: PropType.string.isRequired, // propType is working
    author: PropType.string // Why this propType is not working?
  }).isRequired,
  onMovieClick: PropType.func.isRequired
};
