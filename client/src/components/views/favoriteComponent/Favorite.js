import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';

const Favorite = ({ userFrom, movieId, movieInfo }) => {
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    
    const variable = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieInfo.title 
    };

    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('failed');
                }
            })

            axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                }else {
                    alert('failed');
                }
            })
    },[variable]);

    const onclickFavorite = () => {
        if(Favorited) {
            axios.post("api/favorite/removeFromFavorite", variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else {
                    alert('failed to remove from fav');
                }
            })
        }else {
            axios.post("api/favorite/addToFavorite", variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                }else {
                    alert('failed to add to fav');
                }
            })
        }
    }
 
    return(
        <div>
            <button 
                onClick={onclickFavorite}
                className={Favorited ? 'press' : ''}>{Favorited ? 'Remove from Favorite' : 'Add to Favorite'}</button>
        </div>
    )
}

export default Favorite;