import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie, user, setUser }) => {
	const token = localStorage.getItem('token');

	const addToFavorites = () => {
		fetch(
			`https://movie-api-ul5k.onrender.com/users/${user.Username}/movies/${movie.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log('date', data);
				alert('movie added.');
				localStorage.setItem('user', JSON.stringify(data));
				setUser(data);
			});
	};

	const deleteFromFavorites = () => {
		fetch(
			`https://movie-api-ul5k.onrender.com/users/${user.Username}/movies/${movie.id}`,
			{
				method: 'Delete',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log('date', data);
				alert('movie deleted.');
				localStorage.setItem('user', JSON.stringify(data));
				setUser(data);
			});
	};

	return (
		<>
			<img
				src={movie.ImagePath}
				width="100"
				height="100"
			/>
			<Link
				className="link-card"
				to={`/movies/${encodeURIComponent(movie.id)}`}
			>
				<Card>
					<Card.Img
						variant="top"
						src={movie.Image}
					/>
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Genre.Name}</Card.Text>
					</Card.Body>
				</Card>
			</Link>

			{!user?.FavoriteMovies?.includes(movie.id) ? (
				<Button
					variant="primary"
					type="button"
					onClick={addToFavorites}
				>
					Add to Favorites
				</Button>
			) : (
				<Button
					variant="danger"
					type="button"
					onClick={deleteFromFavorites}
				>
					Delete from Favorites
				</Button>
			)}
		</>
	);
};

//define the props
MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string,
		ImagePath: PropTypes.string,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};
