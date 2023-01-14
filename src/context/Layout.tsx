import Head from "next/head";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Topbar from "../components/Topbar";
import { api } from "../service/api";
import { IGenres } from "../types/genres";

interface ILayoutContext {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  genres: IGenres | null[];
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [title, setTitle] = useState("Orma Carbon Netflix");

  const [genres, setGenres] = useState<IGenres | Array<null>>([]);
  const [genresPage, setGenresPage] = useState<number>(1);
  const [loadingGenres, setLoadingGenres] = useState<boolean>(true);

  const getGenres = () => {
    api
      .get("/genre/movie/list", { params: { page: genresPage } })
      .then((res) => {
        setGenres(res.data.genres);
        setGenresPage((prevState) => prevState++);
        setLoadingGenres(false);
      });
  };

  useEffect(() => {
    loadingGenres && getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingGenres]);

  return (
    <LayoutContext.Provider
      value={{ theme, setTheme, title, setTitle, genres }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar />
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
