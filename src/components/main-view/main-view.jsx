import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../singup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProfileView } from "../profile-view/ProfileView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-ul5k.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api: ", data);
        const moviesFromApi = data.map((doc) => {
          return doc;
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleLogout = () => {
	setUser(null);
	setToken(null);
	localStorage.removeItem("user");
	localStorage.removeItem("token");
  }

  return (
	<BrowserRouter>
	<Routes>
	{
		!user && (
			<Fragment>
				<Route
					path="/"
					element={
						<LoginView
							onLoggedIn={(user, token) => {
								setUser(user);
								setToken(token);
							}}
						/>
					}
				/>
				<Route path="/signup" element={<SignupView />} />
			</Fragment>
		)
}

{
		user && (
			<Fragment>
			<Route
            path="/"
            element={
              <Row className="justify-content-md-center">
				<nav>
          <Link to="/">Movies</Link>
         
        </nav>
                <Col md={8}>
                  {movies.length === 0 ? (
                    <div>The movie list is empty!</div>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-3" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                              setSelectedMovie(newSelectedMovie);
                              location.href = "/movie/"+newSelectedMovie.Title
                            }}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </Col>
                     <Col md={4}>
                  <div>
                    <Link to="/profile"><button>Profile</button></Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </Col>
                
              </Row>
            }
          />
			</Fragment>
		)
	}
	<Route
    path="/movie/:movieId"
    element={<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />}
  />
  <Route
						path="/profile"
						element={
							<>
								{!localStorage.getItem("user") ? (
									<Navigate to='/login' replace />
								) : (
									<Col>
										<ProfileView
											user={user}
											setUser={setUser}
											token={token}
											movies={movies}
										/>
									</Col>
								)}
							</>
						}
					/>
	 </Routes>
  </BrowserRouter>
  );
};
