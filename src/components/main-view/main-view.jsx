import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [showSignupForm, setShowSignupForm] = useState(false);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://movie-api-ul5k.onrender.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((movie) => {
					return {
						id: movie._id,
						Title: movie.Title,
						Description: movie.Description,
						ImagePath: movie.ImagePath,
						Director: movie.Director,
						Genre: movie.Genre,
						Actors: movie.Actors,
						Featured: movie.Featured,
					};
				});

				setMovies(moviesFromApi);
			});
	}, [token]);

	return (
		<BrowserRouter>
			<NavigationBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			/>
			<Row className="justify-content-md-center">
				<Routes>
					<Route
						path="/signup"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/profile"
						element={
							<>
								{!user ? (
									<Navigate
										to="/login"
										replace
									/>
								) : (
									<Col md={8}>
										<ProfileView
											localUser={user}
											movies={movies}
											token={token}
											setUser={setUser}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/movies/:movieId"
						element={
							<>
								{!user ? (
									<Navigate
										to="/login"
										replace
									/>
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/"
						element={
							<>
								{!user ? (
									<Navigate
										to="/login"
										replace
									/>
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col
												className="mb-4"
												key={movie.id}
												md={3}
											>
												<MovieCard
													movie={movie}
													user={user}
													setUser={setUser}
												/>
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<Col md={8}>
									<LoginView />
								</Col>
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
