import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextTruncate from "react-text-truncate";

import { IMovies } from "../../types/movies";
import { useRouter } from "next/router";

const Movies: React.FC<{ movies: IMovies | Array<null> }> = ({ movies }) => {
  const router = useRouter();

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {movies.map((movie, index) => (
        <div
          key={index}
          role="button"
          onClick={(index) => {
            movie && router.push(`/movies/${movie.id}`);
          }}
          className="d-flex mb-3 flex-column align-items-center animation-card-scroll"
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
            width={290}
            height={290 * 0.5625}
          />
          {movie && (
            <div className="d-flex flex-column align-items-center text-center flex-wrap w-230px mb-3">
              <h2 className="fs-5 mb-0 mb-2">{movie?.title}</h2>
              <h3 className="fs-6 mb-0">({movie?.original_title})</h3>
              <TextTruncate
                line={2}
                element="small"
                truncateText="…"
                text={movie?.overview}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;
