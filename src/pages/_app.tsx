import type { AppProps } from "next/app";
import LayoutProvider from "../context/Layout";
import "../../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  );
}
