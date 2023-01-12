import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Carousel } from "react-responsive-carousel";

import { api } from "../../../service/api";

import { IMovies } from "../../../types/movies";

const Home: React.FC = () => {
  const [moviesUpComing, setMoviesUpComing] = useState<Array<null> | IMovies>(
    []
  );

  const [loadingUpComing, setLoadingUpComing] = useState(true);

  useEffect(() => {
    api.get("/movie/upcoming").then((res) => {
      setMoviesUpComing(res.data.results);
      setLoadingUpComing(false);
    });
  }, []);

  return (
    <div className="p-3 max-w-100vw">
      {loadingUpComing ? (
        <div className="d-flex justify-content-center align-items-center w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      ) : (
        <div className="">
          <h1 className="title">Lançamentos</h1>
          <Carousel
            showIndicators={false}
            centerMode
            centerSlidePercentage={100 / 4}
          >
            {moviesUpComing.map((movie) => (
              <div key={movie?.id} className="me-5px">
                <Image
                  src="/blur.jpeg"
                  loader={() =>
                    `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
                  }
                  alt="thumbnail"
                  width={150}
                  height={90}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Home;
