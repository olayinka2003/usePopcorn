import React from "react";
import { useState } from "react";
import { MovieList } from "./MovieList";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";

export const ListBox = ({ movies, moviedata, Loader, error,onSelect }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <div>
          {/* { Loader ? <Loading/> : <MovieList moviedata={moviedata} movies={movies}/>} */}
          {Loader && <Loading />}
          {!Loader && !error && (
          <MovieList moviedata={moviedata} movies={movies} onSelect={onSelect} />
          )}
          {error && <ErrorMessage message={error} />}
        </div>
      )}
    </div>
  );
};
