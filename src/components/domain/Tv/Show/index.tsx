import Image from "next/image";
import React, { useEffect, useState } from "react";

import { api } from "../../../../service/api";
import { ISerieDetails } from "../../../../types/series";

const SerieShow: React.FC<{ id: number }> = ({ id }) => {
  const [serie, setSerie] = useState<ISerieDetails | undefined>();

  useEffect(() => {
    api.get(`/tv/${id}`).then((res) => {
      setSerie(res.data);
    });
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap px-5 py-3">
      <div className="d-flex w-100 flex-column align-items-center flex-wrap">
        <h1 className="fs-2">{serie?.name}</h1>
        <h2 className="fs-6">({serie?.original_name})</h2>
      </div>
      <Image
        style={{ objectFit: "contain" }}
        src="/blur-poster.jpg"
        {...(serie && serie.poster_path
          ? {
              loader: () =>
                `${process.env.NEXT_PUBLIC_PATH_IMAGE}${serie?.poster_path}`,
            }
          : {})}
        alt="thumbnail"
        width={409}
        height={602}
        priority
        className="mb-3"
      />
      <div className="d-flex">
        <p>{serie?.overview}</p>
      </div>
      {serie?.production_companies &&
        serie?.production_companies.length > 0 && (
          <div className="w-100">
            <h3>Produzido por:</h3>
            <ol>
              {serie?.production_companies.map((companies) => (
                <li key={companies.name}>{companies.name}</li>
              ))}
            </ol>
          </div>
        )}
      {serie?.spoken_languages && serie?.spoken_languages.length > 0 && (
        <div className="w-100">
          <h3>Idioma{serie?.spoken_languages.length > 1 ? "s:" : ":"}</h3>
          <ol>
            {serie?.spoken_languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ol>
        </div>
      )}
      {serie?.genres && serie?.genres.length > 0 && (
        <div className="w-100">
          <h3>Genero{serie?.genres.length > 1 ? "s:" : ":"}</h3>
          <ol>
            {serie?.genres.map((genre) => (
              <li key={genre.name}>{genre.name}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SerieShow;
