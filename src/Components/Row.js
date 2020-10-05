import React, { useState, useEffect } from 'react'
import axios from '../tmdb config/axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargePoster }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchMovies() {
            const request = await axios.get(fetchUrl);

            setMovies(request.data.results)
            console.log(movies);
            return request;
        }
        fetchMovies();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }

    }

    return (
        <div className="row">
            <h1 >{title}</h1>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            className={`movie__poster ${isLargePoster && "tranding_movie"}`}
                            onClick={() => handleClick(movie)}
                            src={`${base_url}${isLargePoster ? movie.poster_path : movie.backdrop_path}`}
                            alt={movies.original_name}
                        />
                    ))
                }
            </div>
            {/* {trailerUrl && <YouTube videoId="2g811Eo7K8U" opts={opts} />} */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
