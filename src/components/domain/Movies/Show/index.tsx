import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../../../Hooks/windowsize";
import { api } from "../../../../service/api";
import { IMovieDetails } from "../../../../types/movies";
import AlertAge from "../../../AlertAge";

const MovieSHow: React.FC<{ id: number }> = ({ id }) => {
  const [movie, setMovie] = useState<IMovieDetails | undefined>();

  const { windowSize } = useWindowSize();

  console.log(windowSize);

  useEffect(() => {
    api.get(`/movie/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap px-5 py-3">
      <div className="d-flex w-100 flex-column align-items-center flex-wrap">
        <h1 className="fs-2">{movie?.title}</h1>
        <h2 className="fs-6">({movie?.original_title})</h2>
      </div>
      <div
        className="d-flex justify-content-around align-items-end"
        style={{
          height: windowSize.height * 0.6454,
          width: windowSize.width * 0.6454,
          backgroundImage:
            movie && movie.poster_path
              ? `url(${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie?.poster_path})`
              : "/blur-poster.jpg",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {!movie?.adult && (
          <div className="mb-3">
            <AlertAge />
          </div>
        )}
      </div>
      <div className="d-flex">
        <p>{movie?.overview}</p>
      </div>
      {movie && (
        <div className="w-100">
          <div className="w-100">
            <p>Total de votos: {movie.vote_count}</p>
          </div>
          <div className="w-100">
            <p
              className={`${
                movie.vote_average > 7
                  ? "text-success"
                  : movie.vote_average < 7 && movie.vote_average > 5
                  ? "text-warning"
                  : "text-danger"
              } fw-bolder`}
            >
              Nota: {movie.vote_average}
            </p>
          </div>
        </div>
      )}
      {movie?.production_companies &&
        movie?.production_companies.length > 0 && (
          <div className="w-100">
            <h3>Produzido por:</h3>
            <ol>
              {movie?.production_companies.map((companies) => (
                <li key={companies.name}>{companies.name}</li>
              ))}
            </ol>
          </div>
        )}
      {movie?.spoken_languages && movie?.spoken_languages.length > 0 && (
        <div className="w-100">
          <h3>Idioma{movie?.spoken_languages.length > 1 ? "s:" : ":"}</h3>
          <ol>
            {movie?.spoken_languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ol>
        </div>
      )}
      {movie?.genres && movie?.genres.length > 0 && (
        <div className="w-100">
          <h3>Genero{movie?.genres.length > 1 ? "s:" : ":"}</h3>
          <ol>
            {movie?.genres.map((genre) => (
              <li key={genre.name}>{genre.name}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default MovieSHow;
