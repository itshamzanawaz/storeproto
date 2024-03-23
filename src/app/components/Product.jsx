'use client'
import { useQuery, gql } from '@apollo/client';
import client from '../client';
import NavBar from './NavBar';
import Footer from './Footer';

const POST_DETAIL = gql`
  query MyQuery($id: String!) {
  product(where: {id: $id}) {
    desc {
      html
    }
    image {
      url
    }
    price
    slug
    title
  }
}

`;

export default function Product({ params }) {
  
  const { loading, error, data } = useQuery(POST_DETAIL, {
    variables: { id : params.id },
    client: client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const post = data.post;

  return(
<div>
<NavBar />


<Footer />
</div>

  )}



