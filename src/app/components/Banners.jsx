"use client";
import React from "react";
import { Carousel } from "antd";
import { gql, useQuery } from "@apollo/client";
import client from "../client";
import Link from "next/link";

const MY_QUERY = gql`
  query banners {
    banners(stage: PUBLISHED) {
      buttonText
      id
      image {
        url
      }
      slug
      smalltext
      stage
      largeText1
      midText
    }
  }
`;

const Banners = () => {
  const { loading, error, data } = useQuery(MY_QUERY, { client });

  if (loading)
    return (
      console.log('loading.....')
    );
  console.log(error, "erorrrrrrrrrrrrrrrrrrrrr");
  if (error) return <p>Error :(</p>;

  const banners = data.banners;

  return (
    <div>
      <Carousel autoplay>
        {banners.map((banner) => {
          return (
            <Link href={"/category/newin"} key={banner.slug}>
              <img
                className="bannerImage"
                src={banner.image[0].url}
                alt="banner"
              />
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banners;
