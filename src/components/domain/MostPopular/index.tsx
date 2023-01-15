import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Movies from "./Movies";

import { api } from "../../../service/api";
import { IMovies } from "../../../types/movies";
import { IShowInfoMovies } from "../../Resources/Movies/movies";

const MostPopular = () => {
  const [loading, setLoading] = useState(true);
  const [showInfoMovies, setShowInfoMovies] = useState<IShowInfoMovies>([]);
  const [movies, setMovies] = useState<Array<null> | IMovies>([]);

  const getPopularMovies = () => {
    api.get("/movie/popular").then((res) => {
      setMovies(res.data.results);
      setLoading(false);
    });
  };

  useEffect(() => {
    loading && getPopularMovies();
  }, [loading]);

  return (
    <InfiniteScroll
      dataLength={movies.length} //This is important field to render the next data
      next={getPopularMovies}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Movies movies={movies} />
    </InfiniteScroll>
  );
};

export default MostPopular;
