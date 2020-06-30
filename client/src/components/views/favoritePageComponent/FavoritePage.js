import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './FavoritePage.module.css';

const FavoritePage = () => {
    const [FavoritedMovies, setFavoritedMovies] = useState([]);
    
    const variable = {
        userFrom: localStorage.getItem('userId')
    }
    const fetchFavMovies = useCallback(() => {
        axios.post('api/favorite/getFavoriteMovies', variable)
        .then(response => {
            if(response.data.success) {
                setFavoritedMovies(response.data.favorites)
            }else {
                alert('failed to fav list')
            } 
        })
    }, [variable])

    useEffect(() => {
        fetchFavMovies();
    }, [fetchFavMovies])

    const removeMovie = (movieId) => {
        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

        axios.post("api/favorite/removeFromFavorite", variable)
            .then(response => {
                if(response.data.success) {
                    fetchFavMovies();
                }else {
                    alert('failed to remove from fav');
                }
            })
    }

    const renderTableBody = FavoritedMovies.map((movie, index) => {
        return <tr>
            <td>{movie.movieTitle}</td>
            <td><button onClick={() => removeMovie(movie.movieId)}>Remove</button></td>
        </tr>
    });

    return (
        <div style={{width: '85%', margin: '3em auto'}}>
            <h1>MY FAVORITE MOVIES</h1>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Remove from Favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage; 