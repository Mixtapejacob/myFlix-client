import React, { useState } from 'react';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';
//import Button from "react-bootstrap/Button";
//import Form from "react-bootstrap/Form";

import { Row, Col, Button, Form } from 'react-bootstrap';

export const ProfileView = ({ localUser, movies, setUser }) => {
	console.log(movies);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	//const [favoriteMovies, setFavoriteMovies] = useState([]);

	const [username, setUsername] = useState(localUser.Username);
	const [password, setPassword] = useState(localUser.Password);
	const [email, setEmail] = useState(localUser.Email);
	const [birthday, setBirthday] = useState(localUser.Birthday);
	const favs = movies.filter((movie) => {
		return storedUser.FavoriteMovies.includes(movie.id);
	});
	console.log(movies);
	console.log(favs);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};
		console.log(
			'https://movie-api-ul5k.onrender.com/users/' + localUser.Username
		);
		fetch('https://movie-api-ul5k.onrender.com/users/' + localUser.Username, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		}).then((response) => {
			if (response.ok) {
				alert('Update successful');
				response.json().then((data) => {
					localStorage.setItem('user', JSON.stringify(data));
					setUser(data);
				});
			} else {
				alert(JSON.stringify(response));
			}
		});
	};

	return (
		<>
			<h2>User Profile</h2>
			<h3>Login/Signup</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Group
					className="mb-3"
					controlId="formUsername"
				>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formPassword"
				>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formEmail"
				>
					<Form.Label>Email:</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formBirthday"
				>
					<Form.Label>Birthday:</Form.Label>
					<Form.Control
						type="date"
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
						required
					/>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
				>
					Submit
				</Button>
			</Form>
			<h3>Favorite Movies</h3>
			{favs &&
				favs.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						user={localUser}
						setUser={setUser}
					/>
				))}
		</>
	);
};
