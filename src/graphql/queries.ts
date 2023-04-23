import { TypedDocumentNode, gql } from "@apollo/client";
import { MoviesListFormatsData } from "@types";
import { QueryListMovieLangByCityArgs } from "src/__generated__/graphql";

export const LIST_MOVIES_AND_FORMATS: TypedDocumentNode<
  MoviesListFormatsData,
  QueryListMovieLangByCityArgs
> = gql`
  query ($city: ID!) {
    listMovieLangByCity(city: $city) {
      movie {
        id
        name
      }
      langs {
        lang {
          name
          langCode
        }
        formats {
          format
        }
      }
    }
  }
`;
