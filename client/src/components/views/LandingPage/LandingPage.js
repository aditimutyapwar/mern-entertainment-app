import React, {useState, useEffect} from 'react';
import Search from '../searchComponent/Search';
import Results from '../resultsComponent/Results';
import MovieDetails from '../movieDetailsComponent/MovieDetails';
import Carousel from '../carouselComponent/Carousel';
import Label from '../genreLabelComponent/GenreLabel';
import axios from 'axios';

function LandingPage() {
    const [searchVal, setSearchVal] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState({});
    const [error, setError] = useState('');
    const [popularResult, setPopularResult] = useState([]);
    const [genreResult, setGenreResult] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios('https://api.themoviedb.org/3/trending/all/day?api_key=4eb033efceb27677c3831bf9be768992');
          setPopularResult(result.data.results);
          };
          fetchData();
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          const result = await axios('https://api.themoviedb.org/3/genre/movie/list?api_key=4eb033efceb27677c3831bf9be768992&language=en-US');
          setGenreResult(result.data.genres);
          };
          fetchData();
      }, []);
    
      const search = (e) => {
        if(e.key === "Enter"){ 
          axios('https://api.themoviedb.org/3/search/movie?api_key=4eb033efceb27677c3831bf9be768992&page=1&query='+ searchVal).then( ({ data }) => {
            let results = data.results;
            setResults(results);
            setError('');
          }).catch(err => {
            setResults([]);
            setError('please enter keyword to search');
          });
        };
      }; 
    
      const searchByGenre = (id) => {
        axios('https://api.themoviedb.org/3/discover/movie?api_key=4eb033efceb27677c3831bf9be768992&with_genres='+ id).then( ({ data }) => {
            let results = data.results;
            setResults(results);
            setError('');
          }).catch(err => {
            setResults([]);
            setError('please enter keyword to search');
          });
      }
    
      const handleInputVal = (e) => { 
        let keyword = e.target.value;
        setSearchVal(keyword);
      };
    
      const movieDetails = (id) => {
        axios('https://api.themoviedb.org/3/movie/'+id+'?api_key=4eb033efceb27677c3831bf9be768992&language=en-US').then( ({ data }) => {
          let result = data;
    
          setSelected(result);
    
        });
      };
    
      const closeMovieDetails = () => {
        setSelected({})
      };
    
    return (
        <div className="App">
            <main className="main">
            
            <Carousel 
                popularResult={popularResult}
                movieDetails={movieDetails} />
            <Search 
                handleInputVal={handleInputVal}
                search={search} />
            <Label 
                genreResult={genreResult} 
                searchByGenre={searchByGenre}/>
            <Results 
                results={results} 
                movieDetails={movieDetails}
                error={error} />
            {(typeof selected.title != "undefined") ? <MovieDetails selected={selected} closeMovieDetails={closeMovieDetails}/> : false }
            </main>
        </div>
    )
}

export default LandingPage
