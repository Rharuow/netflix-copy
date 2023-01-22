import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Carousel } from "react-responsive-carousel";
import TextTruncate from "react-text-truncate";

import { useWindowSize } from "../../../Hooks/windowsize";
import { api } from "../../../service/api";
import { IMovie, IMovies } from "../../../types/movies";
import { IShowInfoMovies } from "./movies";

const Movies: React.FC<{ endPoint?: string; params?: {} }> = ({
  endPoint = "/movie/upcoming",
  params = {},
}) => {
  const [movies, setMovies] = useState<Array<null> | IMovies>([]);
  const [showInfoMovies, setShowInfoMovies] = useState<IShowInfoMovies>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);

  const router = useRouter();

  const { isTablet, isMobile } = useWindowSize();

  const displayCarousel = isTablet ? 2 : isMobile ? 1 : 4;

  const findStatusMovie = (movies: IShowInfoMovies, movie: IMovie) =>
    movies.find((mv) => mv?.id === movie?.id)?.status;

  const getNextMovies = (lastIndex: number, moviesLength: number) => {
    if (lastIndex === moviesLength && hasMore) {
      setLoading(true);
      api
        .get(endPoint, {
          params: {
            page: page + 1,
            ...params,
          },
        })
        .then((res) => {
          setMovies((prevState) => [...prevState, ...res.data.results]);
          setPage(res.data.page);
          setHasMore(res.data.results.length < res.data.total_results);
          setShowInfoMovies((prevState) => [
            ...prevState,
            ...res.data.results.map((movie: { id: number }, index: number) => ({
              id: movie ? movie.id : index,
              status: false,
            })),
          ]);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    api.get(endPoint, { params: { ...params } }).then((res) => {
      setMovies(res.data.results);
      setPage(res.data.page);
      setHasMore(res.data.results.length < res.data.total_results);
      setShowInfoMovies(
        res.data.results.map((movie: { id: number }, index: number) => ({
          id: movie ? movie.id : index,
          status: false,
        }))
      );
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {movies.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-150px w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      ) : (
        <>
          <Carousel
            showIndicators={false}
            centerMode
            showThumbs={false}
            centerSlidePercentage={100 / displayCarousel}
            onChange={(index) => {
              getNextMovies(index, movies.length - 1);
            }}
            onClickItem={(index) => {
              router.push(`/movies/${movies[index]?.id}`);
            }}
          >
            {movies.map((movie, index, self) => (
              <div
                key={movie?.id}
                className="me-5px animation-card-slider"
                role={index < self.length - 1 ? "button" : " "}
                onMouseOver={() => {
                  setShowInfoMovies((prevStateInfos) =>
                    prevStateInfos.map((prevStateInfo) => {
                      if (prevStateInfo?.id === movie?.id && movie)
                        return { id: movie?.id, status: true };
                      return prevStateInfo;
                    })
                  );
                }}
                onMouseLeave={() => {
                  setShowInfoMovies((prevStateInfos) =>
                    prevStateInfos.map((prevStateInfo) => {
                      if (prevStateInfo?.id === movie?.id && movie)
                        return { id: movie?.id, status: false };
                      return prevStateInfo;
                    })
                  );
                }}
              >
                {index < self.length - 1 ? (
                  <>
                    <Image
                      src="/noSignal.jpg"
                      {...(movie && movie.backdrop_path
                        ? {
                            loader: () =>
                              `${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie.backdrop_path}`,
                          }
                        : {})}
                      alt="thumbnail"
                      width={250}
                      priority
                      height={250 * 0.6}
                    />
                    {movie && (
                      <div className="px-5">
                        <h2 className="fs-5 mb-0">{movie.title}</h2>
                        <h3 className="fs-6 mb-0">({movie.original_title})</h3>
                        <TextTruncate
                          line={3}
                          element="small"
                          truncateText="…"
                          text={movie.overview}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  hasMore &&
                  loading && (
                    <div className="d-flex justify-content-center align-items-center h-150px w-100">
                      <ReactLoading
                        type="spinningBubbles"
                        height={60}
                        width={60}
                      />
                    </div>
                  )
                )}
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default Movies;
