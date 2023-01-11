import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";
import Topbar from "../components/Topbar";

interface ILayoutContext {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [title, setTitle] = useState("Orma Carbon Netflix");

  return (
    <LayoutContext.Provider value={{ theme, setTheme, title, setTitle }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Topbar />
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
