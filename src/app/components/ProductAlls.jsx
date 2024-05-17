"use client";
import client from "../client";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { Card } from "antd";
import { useState } from "react";
import { Select } from "antd";
import ClipLoader from "react-spinners/ClipLoader";

const { Meta } = Card;

const { Option } = Select;

const ProductAlls = () => {
  const [search, setSearch] = useState("");
  const [values, setValue] = useState();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const MY_QUERY = gql`
    query Products {
  products(stage: PUBLISHED, orderBy: createdAt_ASC) {
    id
    image {
      id
      url
    }
    price
    slug
    stage
    title
  }
}

  `;

const { loading, error, data, refetch } = useQuery(MY_QUERY, { client });


  if (loading) return <p className="loader-center">
  <ClipLoader />
</p>;
  if (error) return console.log(error,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

  // return data when it's available
  const products = data.products;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (values) {
      case "price_ASC":
        return a.price - b.price;
      case "price_DESC":
        return b.price - a.price;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div>
      <h1 className="text-center text-4xl text-zinc-700 font-semibold m-10 ">
        Best Sellers Products
      </h1>
      <div className="flex justify-center">
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 rounded-full border-2 border-solid border-black text-center"
        />
      </div>
      <div className="ml-12">
      <Select
        defaultValue="createdAt_ASC"
        style={{ width: 200 }}
        onChange={handleChange}
        className="text-center min-center"
      >
        <Option value="createdAt_ASC">Newest</Option>
        <Option value="price_ASC">Price Low to High</Option>
        <Option value="price_DESC">Price High to Low</Option>
      </Select>
      </div>
      <div className="flex justify-center align-middle mb-10 flex-wrap">
        {sortedProducts.map((product) => {

          return (
          
            <div
              key={product.id}
              className="hover:transition-all hover:scale-110 m-6"
            >
              <Link href={`/Product/${product.id}`} passHref >
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="product"
                      src={product.image[0].url}
                      className="h-72"
                    />
                  }
                >
                  <Meta title={product.title} />
                  <span className="inline pt-4 font-bold">
                    {" "}
                    PKR {product.price}
                  </span>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductAlls;
