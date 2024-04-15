// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(movie)
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };

  // Here is where we define all the props constraints for the MovieCard
// MovieCard.propTypes = {
//   book: PropTypes.shape({
//     title: PropTypes.string
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };