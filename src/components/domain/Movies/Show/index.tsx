import Image from "next/image";
import React, { useEffect, useState } from "react";
import { api } from "../../../../service/api";
import { IMovieDetails } from "../../../../types/movies";

const MovieSHow: React.FC<{ id: number }> = ({ id }) => {
  const [movie, setMovie] = useState<IMovieDetails | undefined>();

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
      <Image
        style={{ objectFit: "contain" }}
        src="/blur.jpeg"
        loader={() =>
          `${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie?.poster_path}`
        }
        alt="thumbnail"
        width={409}
        height={602}
        priority
        className="mb-3"
      />
      <div className="d-flex">
        <p>{movie?.overview}</p>
      </div>
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
