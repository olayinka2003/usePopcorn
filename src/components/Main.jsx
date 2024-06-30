import React from "react";
import { ListBox } from "./ListBox";
import { Watched } from "./Watched";
import { SelectedMovie } from "./SelectedMovie";
import { useState } from "react";

export const Main = ({
  movies,
  moviedata,
  Loader,
  error,
  selectedId,
  onSelect,
  onCloseMovie,
  watched,
  onAddWatched,
  onDeleteWatched,
}) => {
  const [rating, setRating] = useState("");
  return (
    <main className="main">
      <ListBox
        movies={movies}
        moviedata={moviedata}
        Loader={Loader}
        error={error}
        onSelect={onSelect}
      />
    {selectedId ? <SelectedMovie selectedId={selectedId} onCloseMovie={onCloseMovie} onAddWatched={onAddWatched}rating={rating} setRating={setRating} watched={watched}/> : <Watched watched={watched} rating={rating} onDeleteWatched={onDeleteWatched}/>}
    </main>
  );
};
