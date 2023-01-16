import styled from "styled-components";

const Cover = styled("div")<{
  imageUrl: string;
  margin?: string;
}>`
  background-image: url("${process.env.NEXT_PUBLIC_PATH_IMAGE}${(props) =>
    props.imageUrl || "./blur.jpeg"}");
  background-size: cover;
  background-repeat: no-repeat;
  width: calc(100% + 32px);
  margin: ${(props) => props.margin || "-16px 0 0 -16px"};
  min-height: calc(100vh - 100px);
`;

export default Cover;
