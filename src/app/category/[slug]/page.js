"use client";
import client from "../../client";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React,{useState} from "react";
import { Card } from "antd";
import { Select } from "antd";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

const { Meta } = Card;

const { Option } = Select;

export default function Category({params}) {
  const [search, setSearch] = useState("");
  const [values, setValue] = useState();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };

  const MY_QUERY = gql`
   query MyQuery($slug: String!) {
  products(where: {categories_some: {slug: $slug}}, stage: PUBLISHED) {
    id
    image {
      url
    }
    price
    slug
    stage
    title
  }
}


  `;
console.log(params.slug,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
const { loading, error, data } = useQuery(MY_QUERY, {
    variables: { slug : params.slug },
    client: client,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
    <NavBar />
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
        className="text-center"
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
      <Footer/>
    </div>
  );
};

