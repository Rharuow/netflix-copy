import React from "react";
import { Card } from "react-bootstrap";
import Slider from "../Slider";

const MaterialDesign = () => {
  const items = [
    {
      image:
        "https://www.shutterstock.com/image-photo/long-film-strip-blank-photo-260nw-1163250289.jpg",
      description:
        "Proident amet labore dolor deserunt exercitation commodo amet consequat id est enim. ",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/long-film-strip-blank-photo-260nw-1163250289.jpg",
      description:
        "Proident amet labore dolor deserunt exercitation commodo amet consequat id est enim. ",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/long-film-strip-blank-photo-260nw-1163250289.jpg",
      description:
        "Proident amet labore dolor deserunt exercitation commodo amet consequat id est enim. ",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/long-film-strip-blank-photo-260nw-1163250289.jpg",
      description:
        "Proident amet labore dolor deserunt exercitation commodo amet consequat id est enim. ",
    },
  ];

  return (
    <div className="w-50">
      <Slider>
        {items.map((item, index) => {
          return (
            <Card key={index}>
              <Card.Body className="text-dark">{item.description}</Card.Body>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};

export default MaterialDesign;
