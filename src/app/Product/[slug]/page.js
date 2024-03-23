"use client";
import { useQuery, gql } from "@apollo/client";
import client from "../../client";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Carousel } from "antd";
import { useStateContext } from "../../context/Statecontext";
import Link from "next/link";
const POST_DETAIL = gql`
  query MyQuery($id: ID = "") {
    product(where: { id: $id }, stage: PUBLISHED) {
      categories {
        title
        desc {
          html
        }
      }
      id
      price
      slug
      stage
      title
      image {
        url
      }
      desc {
        html
      }
    }
  }
`;

export default function Product({ params }) {
  const { onAdd } = useStateContext();
  

  const { loading, error, data } = useQuery(POST_DETAIL, {
    variables: { id: params.slug },
    client: client,
  });
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
  
  const { loading: l, error: e, data: d } = useQuery(MY_QUERY, { client });

  if (l) return <p>Loading...</p>;
  if (e) return console.log(error, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  // return data when it's available
  const products = d.products;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product;

  return (
    <div>
      <NavBar />
      <div className="flex justify-center m-10 flex-wrap">
        <div>
          <Carousel autoplay className="w-80 h-80 m-10">
            {product.image.map((image) => (
              <img
                className="w-80 h-80"
                src={image.url}
                alt="img"
                key={image.url}
              />
            ))}
          </Carousel>
          <h1 className="font-semibold text-center text-2xl">
            Price in Pkr {product.price}
          </h1>
        </div>

        {product && (
          <div>
          <div className="m-10 ">
            <h1 className="font-semibold text-2xl">{product.title}</h1>
            <h1 className="text-2xl">{product.categories[0].title}</h1>

            <div
              className="py-4 width-of-desc"
              dangerouslySetInnerHTML={{ __html: product.desc.html }}
            />

            </div>
            <div className=" flex flex-row justify-center">
            <button className="w-28 sm:w-40 h-16 text-white rounded-md mx-2 bg-teal-700 hover:transition-all hover:scale-110 p-3"  onClick={() => onAdd(product, 1)}>
              Add to Cart
            </button>
            <button className="w-28 sm:w-40 h-16 text-white rounded-md mx-2 bg-red-600 hover:transition-all hover:scale-110 p-3" onClick={()=>{return <Link href='/Checkout'></Link>}}>
              Buy Now
            </button>
            </div>
            </div>
        )}
      </div>
      
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <div key={item.id} className="hover:transition-all hover:scale-110">
              <img src={item.image[0].url} alt="product" className="w-72 rounded-md h-72 " />
              <h1>{item.title}</h1>
              <h1>{item.price}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
