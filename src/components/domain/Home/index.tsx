import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useLayoutContext } from "../../../context/Layout";
import { api } from "../../../service/api";
import { IMovie } from "../../../types/movies";
import MoviesByGenre from "../../Resources/Movies/Genres";

import UpComing from "../../Resources/Movies/UpComing";
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
    <div className="p-3 max-w-100vw min-vh-100">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-150px w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      ) : (
        <>
          {movie && (
            <Cover movie={{ backdrop_path: movie.backdrop_path }}>
              <div className="h-100"></div>
            </Cover>
          )}
          <div className="mb-3">
            <UpComing />
          </div>
          {genres.length > 0 &&
            genres.map((genre) => (
              <div key={genre?.id} className="mb-3">
                <MoviesByGenre title={genre?.name} genre_id={genre?.id} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
