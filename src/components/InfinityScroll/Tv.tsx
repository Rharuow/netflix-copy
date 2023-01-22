import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextTruncate from "react-text-truncate";

import { ISeries } from "../../types/series";
import { IShowInfoMovies } from "../Resources/Movies/movies";
import { useWindowSize } from "../../Hooks/windowsize";
import { useRouter } from "next/router";

const TvSeries: React.FC<{ series: ISeries | Array<null> }> = ({ series }) => {
  const [showInfo, setShowInfo] = useState<IShowInfoMovies>([]);

  const { isMobile, isTablet } = useWindowSize();

  const router = useRouter();

  useEffect(() => {
    series.length &&
      setShowInfo(
        series.map((serie, index) => ({
          id: serie ? serie.id : index,
          status: false,
        }))
      );
  }, [series]);

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {series.map((serie, index) => (
        <div
          key={index}
          onMouseOver={() =>
            setShowInfo((prevState) =>
              prevState.map((info, index) => {
                if (info?.id === serie?.id)
                  return { id: info ? info.id : index, status: true };
                return info;
              })
            )
          }
          role="button"
          onClick={(index) => {
            serie && router.push(`/tv/${serie.id}`);
          }}
          onMouseLeave={() =>
            setShowInfo((prevState) =>
              prevState.map((info) => {
                if (info?.id === serie?.id)
                  return { id: info ? info.id : index, status: false };
                return info;
              })
            )
          }
          className="d-flex mb-3 flex-column align-items-center animation-card-scroll"
        >
          <Image
            src="/noSignal.jpg"
            alt="backdrop"
            {...(serie && serie.backdrop_path
              ? {
                  loader: () =>
                    `${process.env.NEXT_PUBLIC_PATH_IMAGE}${serie?.backdrop_path}`,
                }
              : {})}
            width={290}
            height={290 * 0.5625}
          />
          {serie && (
            <div className="d-flex flex-column align-items-center text-center flex-wrap w-230px mb-3">
              <h2 className="fs-5 mb-0 mb-2">{serie?.name}</h2>
              <h3 className="fs-6 mb-0">({serie?.original_name})</h3>
              <TextTruncate
                line={2}
                element="small"
                truncateText="…"
                text={serie?.overview}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TvSeries;
