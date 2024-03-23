'use client'
import { gql, useQuery } from "@apollo/client"
import client from "../client";

const MY_QUERY = gql`
query banners {
  banners(stage: PUBLISHED) {
    buttontext
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
`


const Bannersget = () => {
    const { loading, error, data } = useQuery(MY_QUERY, { client });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // return data when it's available
    return data.banners;
}

export default Bannersget;
