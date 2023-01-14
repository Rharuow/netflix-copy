import React from "react";
import Movies from "..";

const MoviesByGenre: React.FC<{
  genre_id: number | undefined;
  title: string | undefined;
}> = ({ genre_id, title }) => {
  return (
    <>
      <h1 className="title">{title}</h1>
      <Movies endPoint="/discover/movie" params={{ with_genres: genre_id }} />
    </>
  );
};

export default MoviesByGenre;
