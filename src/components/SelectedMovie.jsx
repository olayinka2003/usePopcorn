import React, { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { Loading } from "./Loading";

const ApiKey = "4ae06de5";

export const SelectedMovie = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  rating,
  setRating,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const WatchedRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.rating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      rating,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }
  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${ApiKey}&i=${selectedId}`
      );
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);
  useEffect(()=>{

    function callback(e){
      if(e.code === 'Escape'){
        onCloseMovie();
      }
    }
    document.addEventListener('keydown', callback)

    return function(){
      document.removeEventListener('keydown', callback);
    }
    },[onCloseMovie])
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of the ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}, &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  {" "}
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setRating}
                    Rating={rating}
                  />
                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {WatchedRating} <span>⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
