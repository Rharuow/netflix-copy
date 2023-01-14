import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Image from "next/image";
import TextTruncate from "react-text-truncate";

import { api } from "../../../service/api";
import { IMovie, IMovies } from "../../../types/movies";
import { IShowInfoMovies } from "../../Resources/Movies/movies";
import { Col, Row } from "react-bootstrap";

const MostPopular = () => {
  const [loading, setLoading] = useState(true);
  const [showInfoMovies, setShowInfoMovies] = useState<IShowInfoMovies>([]);
  const [movies, setMovies] = useState<Array<null> | IMovies>([]);

  const findStatusMovie = (movies: IShowInfoMovies, movie: IMovie) =>
    movies.find((mv) => mv?.id === movie?.id)?.status;

  const getPopularMovies = () => {
    api.get("/movie/popular").then((res) => {
      console.log(res.data.results);
      setMovies(res.data.results);
      setLoading(false);
    });
  };

  useEffect(() => {
    loading && getPopularMovies();
  }, [loading]);

  return (
    <div className="d-flex flex-wrap">
      {movies.map((movie, index, self) => (
        <div key={movie?.id} className="px-2 h-100">
          <Image
            src="/noSignal.jpg"
            alt="poster"
            {...(movie && movie.backdrop_path
              ? {
                  loader: () =>
                    `${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie?.backdrop_path}`,
                }
              : {})}
            sizes="25vw"
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default MostPopular;
