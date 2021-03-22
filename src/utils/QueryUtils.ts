import { gql } from "@apollo/client";

const getDetailsQuery = (entity: string) => {
  switch (entity) {
    case "character":
      return gql`query Details($id: ID!){
                ${entity}(id: $id){
                    name
                    status
                    species
                    type
                    gender
                    origin {
                        name
                    }
                    location {
                        name
                    }
                    image
                    episode {
                        name
                    }
                    created
                }
            }`;
    case "episode":
      return gql`query Details($id: ID!){
                ${entity}(id: $id){
                    name
                    air_date
                    episode
                    characters {
                        name
                        image
                        type
                    }
                    created
                }
            }`;
    case "location":
      return gql`query Details($id: ID!){
                ${entity}(id: $id){
                    name
                    dimension
                    type
                    residents {
                        name
                        image
                        type
                    }
                }
            }`;
    default:
      return gql``;
  }
};

export { getDetailsQuery };
