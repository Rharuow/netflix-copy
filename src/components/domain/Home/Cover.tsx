import styled from "styled-components";

const Cover = styled("div")<{ movie: { backdrop_path: string } }>`
  background-image: url("${process.env.NEXT_PUBLIC_PATH_IMAGE}${(props) =>
    props.movie.backdrop_path || "./blur.jpeg"}");
  background-size: "cover";
  background-repeat: "no-repeat";
  height: 100%;
`;

export default Cover;
