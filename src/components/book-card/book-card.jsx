// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ m, onMovieClick }) => {
  console.log(m)
    return (
      <div
        onClick={() => {
          onMovieClick(m);
        }}
      >
        {m.Title}
      </div>
    );
  };

  // Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  m: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};