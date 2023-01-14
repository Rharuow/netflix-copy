import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { useWindowSize } from "../../../Hooks/windowsize";
import { api } from "../../../service/api";
import { IMovie, IMovies } from "../../../types/movies";
import TextTruncate from "react-text-truncate";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";

type IShowInfoMovies = Array<{
  id: number;
  status: boolean;
} | null>;

const MoviesUpComing = () => {
  const [movies, setMovies] = useState<Array<null> | IMovies>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showInfoMovies, setShowInfoMovies] = useState<IShowInfoMovies>([]);
  const [loading, setLoading] = useState(true);
  const { isTablet, isMobile } = useWindowSize();

  const displayCarousel = isTablet ? 2 : isMobile ? 1 : 4;

  const getNextMovies = (lastIndex: number, moviesLength: number) => {
    if (lastIndex === moviesLength && hasMore) {
      setLoading(true);
      api
        .get("/movie/upcoming", {
          params: {
            page: page + 1,
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

  const router = useRouter();

  const findStatusMovie = (movies: IShowInfoMovies, movie: IMovie) =>
    movies.find((mv) => mv?.id === movie?.id)?.status;

  useEffect(() => {
    api.get("/movie/upcoming").then((res) => {
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
      <h1 className="title">Lançamentos</h1>
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
            className={` me-5px transform-size-hover transform-hover position-relative ${
              movie &&
              index < self.length - 1 &&
              findStatusMovie(showInfoMovies, movie)
                ? "h-260px"
                : " "
            }`}
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
                  src="/blur.jpeg"
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_PATH_IMAGE}${movie?.backdrop_path}`
                  }
                  alt="thumbnail"
                  width={120}
                  priority
                  height={120}
                />
                {movie && findStatusMovie(showInfoMovies, movie) && (
                  <div className="transform-display-hover px-5">
                    <h2 className="fs-5 mb-0">{movie.title}</h2>
                    <h3 className="fs-6 mb-0">({movie.original_title})</h3>
                    <TextTruncate
                      line={2}
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

export default MoviesUpComing;
