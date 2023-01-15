import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Movies from "./Movies";

import { api } from "../../../service/api";
import { IMovies } from "../../../types/movies";
import ReactLoading from "react-loading";

const MostPopular = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Array<null> | IMovies>([]);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getPopularMovies = () => {
    api.get("/movie/popular", { params: { page } }).then((res) => {
      setMovies((prevState) => [...prevState, ...res.data.results]);
      setTotalPage(res.data.total_pages);
      setPage(res.data.page + 1);
      setLoading(false);
    });
  };

  useEffect(() => {
    loading && getPopularMovies();
  }, [loading]);

  console.log(movies.length);

  return (
    <InfiniteScroll
      dataLength={movies.length} //This is important field to render the next data
      next={getPopularMovies}
      hasMore={totalPage >= page}
      loader={
        <div className="d-flex justify-content-center align-items-center h-150px w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Todos os filmes foram carragos...</b>
        </p>
      }
    >
      <Movies movies={movies} />
    </InfiniteScroll>
  );
};

export default MostPopular;
