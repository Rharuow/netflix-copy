import { useRouter } from "next/router";
import React from "react";
import ReactLoading from "react-loading";
import MovieSHow from "../../components/domain/Movies/Show";

const MoviePage = () => {
  const {
    query: { id },
  } = useRouter();

  return id ? (
    <MovieSHow id={+id} />
  ) : (
    <div className="d-flex justify-content-center align-items-center h-150px w-100">
      <ReactLoading type="spinningBubbles" height={160} width={160} />
    </div>
  );
};

export default MoviePage;
