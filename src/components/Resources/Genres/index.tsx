import React, { useEffect, useState } from "react";
import { api } from "../../../service/api";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api.get("genre/movie/list").then((res) => {
      console.log(res);
    });
  }, []);

  return <div>Genres</div>;
};

export default Genres;
