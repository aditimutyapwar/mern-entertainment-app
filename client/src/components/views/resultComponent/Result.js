import React from 'react';
import classes from '../resultComponent/Result.module.css';
import Favorite from '../favoriteComponent/Favorite';

const Result = ({ result, movieDetails }) => {
    const img_src = "https://image.tmdb.org/t/p/w185/" + result.poster_path;
    return(
        <div 
            className={classes.result} 
            onClick={() => movieDetails(result.id) }>
            <img src={img_src} alt="Poster" />
            <h3> {result.title}</h3>
        </div>
    )
};

export default Result;