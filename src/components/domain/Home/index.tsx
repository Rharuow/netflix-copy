import React from "react";
import { useLayoutContext } from "../../../context/Layout";
import MoviesByGenre from "../../Resources/Movies/Genres";

import UpComing from "../../Resources/Movies/UpComing";

const Home: React.FC = () => {
  const { genres } = useLayoutContext();

  return (
    <div className="p-3 max-w-100vw">
      <div className="mb-3">
        <UpComing />
      </div>

      {genres.length > 0 &&
        genres.map((genre) => (
          <div key={genre?.id} className="mb-3">
            <MoviesByGenre title={genre?.name} genre_id={genre?.id} />
          </div>
        ))}
    </div>
  );
};

export default Home;
