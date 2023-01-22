import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useLayoutContext } from "../../../context/Layout";
import { api } from "../../../service/api";
import { IMovie } from "../../../types/movies";
import AlertAge from "../../AlertAge";
import MoviesByGenre from "../../Resources/Movies/Genres";

import UpComing from "../../Resources/Movies/UpComing";
import Background from "./Background";
import Cover from "./Cover";

const Home: React.FC = () => {
  const { genres } = useLayoutContext();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<IMovie | undefined>();

  const getMoviePlay = () => {
    api.get("/movie/now_playing").then((res) => {
      setMovie(res.data.results.find((movie: IMovie) => !!movie.backdrop_path));
      setLoading(false);
    });
  };

  useEffect(() => {
    loading && getMoviePlay();
  }, [loading]);

  return (
    <div className="p-3 max-w-100vw min-vh-100 position-relative">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-150px w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      ) : (
        <>
          {movie && (
            <Cover imageUrl={movie.backdrop_path} margin="-16px 0 32px -16px">
              <Background>
                <div className="d-flex p-3 flex-wrap flex-column-reverse min-h-100vh max-w-100">
                  {movie.adult && (
                    <div>
                      <AlertAge />
                    </div>
                  )}
                  <p>Total de votos: {movie.vote_count}</p>
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
                  <p>{movie.overview}</p>
                  <h2>{movie.original_title}</h2>
                  <h1>{movie.title}</h1>
                </div>
              </Background>
            </Cover>
          )}
          <div className="my-5 px-5">
            <UpComing />
          </div>
          {genres.length > 0 &&
            genres.map((genre) => (
              <div key={genre?.id} className="my-5 px-5">
                <MoviesByGenre title={genre?.name} genre_id={genre?.id} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
