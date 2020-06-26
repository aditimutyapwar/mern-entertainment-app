import React from 'react';
import classes from './Carousel.module.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
const Carousel = ({ popularResult, movieDetails  }) => {
  
  return (
    <div className={classes.carousel}>
      <Slider autoplay={3000}>
        {popularResult ? popularResult.map((item, index) => {
          const imgUrl = item.backdrop_path ? "https://image.tmdb.org/t/p/w1280" + item.backdrop_path : '';
          return (
          <div
            key={index}
            onClick={() => movieDetails(item.id)}
            className={classes.sliderContent}
            style={{ background: `url('${imgUrl}') no-repeat center center` }}>
            <div className={classes.inner}>
              <h1>{item.title}</h1>
              <p>{item.overview}</p>
            </div>
          </div>
        )}) : null}
      </Slider>
    </div>
  );
}

export default Carousel