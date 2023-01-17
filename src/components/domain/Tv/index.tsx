/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";

import TvSeries from "../../InfinityScroll/Tv";
import { api } from "../../../service/api";
import { ISerie, ISeries } from "../../../types/series";

const Tv = () => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<Array<null> | ISeries>([]);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getPopularSeries = () => {
    api.get("/tv/top_rated", { params: { page } }).then((res) => {
      setSeries((prevState) => {
        const newSeries = res.data.results.filter((result: ISerie) =>
          prevState.every((serie: ISerie) => serie.id !== result.id)
        );
        return [...prevState, ...newSeries];
      });
      setTotalPage(res.data.total_pages);
      setPage(res.data.page + 1);
      setLoading(false);
    });
  };

  useEffect(() => {
    loading && getPopularSeries();
  }, [series]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-150px w-100">
          <ReactLoading type="spinningBubbles" height={60} width={60} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={series.length}
          next={getPopularSeries}
          hasMore={totalPage >= page}
          loader={
            <div className="d-flex justify-content-center align-items-center h-150px w-100">
              <ReactLoading type="spinningBubbles" height={60} width={60} />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Todos as séries foram carregadas...</b>
            </p>
          }
        >
          <TvSeries series={series} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Tv;
