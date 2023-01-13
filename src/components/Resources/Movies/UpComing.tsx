import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { useWindowSize } from "../../../Hooks/windowsize";
import { api } from "../../../service/api";
import { IMovie, IMovies } from "../../../types/movies";
import TextTruncate from "react-text-truncate";
import ReactLoading from "react-loading";

type IShowInfoMoviesUpComing = Array<{
  id: number;
  status: boolean;
} | null>;

const UpComing = () => {
  const [moviesUpComing, setMoviesUpComing] = useState<Array<null> | IMovies>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>();
  const [totalResults, setTotalResults] = useState<number>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showInfoMoviesUpComing, setShowInfoMoviesUpComing] =
    useState<IShowInfoMoviesUpComing>([]);
  const [loadingUpComing, setLoadingUpComing] = useState(true);
  const { isTablet, isMobile } = useWindowSize();

  const displayCarousel = isTablet ? 2 : isMobile ? 1 : 4;

  const getNextMoviesUpComing = (
    lastIndex: number,
    moviesUpComingLength: number
  ) => {
    if (lastIndex === moviesUpComingLength && hasMore) {
      setLoadingUpComing(true);
      api
        .get("/movie/upcoming", {
          params: {
            page: page + 1,
          },
        })
        .then((res) => {
          setMoviesUpComing((prevState) => [...prevState, ...res.data.results]);
          setTotalPages(res.data.total_pages);
          setPage(res.data.page);
          setTotalResults(res.data.total_results);
          setHasMore(res.data.results.length < res.data.total_results);
          setShowInfoMoviesUpComing((prevState) => [
            ...prevState,
            ...res.data.results.map((movie: { id: number }, index: number) => ({
              id: movie ? movie.id : index,
              status: false,
            })),
          ]);
          setLoadingUpComing(false);
        });
    }
  };

  const findStatusMovie = (movies: IShowInfoMoviesUpComing, movie: IMovie) =>
    movies.find((mv) => mv?.id === movie?.id)?.status;

  useEffect(() => {
    api.get("/movie/upcoming").then((res) => {
      setMoviesUpComing(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
      setTotalResults(res.data.total_results);
      setHasMore(res.data.results.length < res.data.total_results);
      setShowInfoMoviesUpComing(
        res.data.results.map((movie: { id: number }, index: number) => ({
          id: movie ? movie.id : index,
          status: false,
        }))
      );
      setLoadingUpComing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1 className="title">Lançamentos</h1>
      <Carousel
        showIndicators={false}
        centerMode
        showThumbs={false}
        centerSlidePercentage={100 / displayCarousel}
        onChange={(index) => {
          getNextMoviesUpComing(index, moviesUpComing.length - 1);
        }}
      >
        {moviesUpComing.map((movie, index, self) => (
          <div
            key={movie?.id}
            className={`d-flex align-items-center flex-wrap me-5px transform-size-hover transform-hover position-relative ${
              movie &&
              index < self.length - 1 &&
              findStatusMovie(showInfoMoviesUpComing, movie)
                ? "h-260px"
                : " "
            }`}
            role={index < self.length - 1 ? "button" : " "}
            onMouseOver={() => {
              setShowInfoMoviesUpComing((prevStateInfos) =>
                prevStateInfos.map((prevStateInfo) => {
                  if (prevStateInfo?.id === movie?.id && movie)
                    return { id: movie?.id, status: true };
                  return prevStateInfo;
                })
              );
            }}
            onMouseLeave={() => {
              setShowInfoMoviesUpComing((prevStateInfos) =>
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
                  src="/blur.jpeg"
                  loader={() =>
                    `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
                  }
                  alt="thumbnail"
                  width={150}
                  priority
                  height={150}
                />
                {movie && findStatusMovie(showInfoMoviesUpComing, movie) && (
                  <div className="transform-display-hover z-index-3">
                    <h2 className="fs-5 mb-0">{movie.title}</h2>
                    <h3 className="fs-6 mb-0">({movie.original_title})</h3>
                    <TextTruncate
                      line={2}
                      element="span"
                      truncateText="…"
                      text={movie.overview}
                    />
                  </div>
                )}
              </>
            ) : (
              hasMore &&
              loadingUpComing && (
                <div className="d-flex justify-content-center align-items-center h-150px w-100">
                  <ReactLoading type="spinningBubbles" height={60} width={60} />
                </div>
              )
            )}
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default UpComing;
