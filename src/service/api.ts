import axios from "axios";

const key = process.env.NEXT_PUBLIC_KEY;

const api = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: key,
    language: "pt-BR",
    page: 1,
  },
});

const imageApi = axios.create({
  baseURL: `http://image.tmdb.org/t/p/`,
});

export { api, imageApi };
