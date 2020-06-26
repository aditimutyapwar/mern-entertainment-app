import React from 'react';
import classes from './GenreLabel.module.css';

const Genrelabel = ({ genreResult, searchByGenre }) => (

    <div className={classes.genreContainer}>
      { genreResult.map( genre => (
            <div className={classes.label} 
            key={genre.id} onClick={() => searchByGenre(genre.id)}>{genre.name}</div>
        ) )
      }
    </div>
  );


  export default Genrelabel;