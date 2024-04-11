export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.Image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Author: </span>
          <span>{movie.Author}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };