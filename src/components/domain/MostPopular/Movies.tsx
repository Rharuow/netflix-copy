import React, { useEffect, useState } from "react";
import Image from "next/image";

import { IMovies } from "../../../types/movies";
import { IShowInfoMovies } from "../../Resources/Movies/movies";
import TextTruncate from "react-text-truncate";

const Movies: React.FC<{ movies: IMovies | Array<null> }> = ({ movies }) => {
  const [showInfo, setShowInfo] = useState<IShowInfoMovies>([]);

  useEffect(() => {
    movies.length &&
      setShowInfo(
        movies.map((movie, index) => ({
          id: movie ? movie.id : index,
          status: false,
        }))
      );
  }, [movies]);

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {movies.map((movie, index) => (
        <div
          key={index}
          onMouseOver={() =>
            setShowInfo((prevState) =>
              prevState.map((info, index) => {
                if (info?.id === movie?.id)
                  return { id: info ? info.id : index, status: true };
                return info;
              })
            )
          }
          onMouseLeave={() =>
            setShowInfo((prevState) =>
              prevState.map((info) => {
                if (info?.id === movie?.id)
                  return { id: info ? info.id : index, status: false };
                return info;
              })
            )
          }
          className="d-flex mb-3 flex-column align-items-center transform-size-hover transform-h-250px-hover transform-hover"
        >
          <Image
            src="/noSignal.jpg"
            alt="backdrop"
            {...(movie && movie.backdrop_path
              ? {
                  loader: () =>
                    `${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie?.backdrop_path}`,
                }
              : {})}
            width={230}
            height={230 * 0.5625}
          />
          {movie && showInfo.find((info) => info?.id === movie.id)?.status && (
            <>
              <h2 className="fs-5 mb-0">{movie.title}</h2>
              <h3 className="fs-6 mb-0">({movie.original_title})</h3>
              <p>{movie.overview}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;
