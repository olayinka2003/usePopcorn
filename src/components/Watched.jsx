import React from 'react'
import { useState } from 'react';
 

export const Watched = ({watched,rating,onDeleteWatched}) => {

   
    const [isOpen2, setIsOpen2] = useState(true);
    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.rating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen2((open) => !open)}
    >
      {isOpen2 ? "–" : "+"}
    </button>
    {isOpen2 && (
      <>
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>

        <ul className="list">
          {watched.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.poster} alt={`${movie.title} poster`} />
              <h3>{movie.title}</h3>
              <div>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{movie.rating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
                </p>

                <button onClick={() => onDeleteWatched(movie.imdbID)} className='btn-delete'>X</button>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
  )
}
