import React, { useState, useEffect } from 'react'
import axios from '../tmdb config/axios';
import Requests from '../tmdb config/request';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(Requests.fetchNetflixOriginals);
            //this gives random single movies from request set
            setMovie(request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
            ]);
        }
        fetchData();
    }, [])
    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <header className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                backgroundSize: "cover"
            }}
        >
            <div className="banner__content">
                <h1 style={{ color: "white" }} className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__btns">
                    <button className="banner__btn">Play</button>
                    <button className="banner__btn">My List</button>
                </div>
                <div className="banner__desc">
                    <h4>{truncate(movie?.overview, 150)}</h4>
                </div>

            </div>
            <div className="banner__fade__bottom"></div>

        </header >
    )
}

export default Banner
