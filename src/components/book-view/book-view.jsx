export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie.ImagePath)
    return (
      <div>
          <img src={movie.ImagePath} width={500} height={500} />
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
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };