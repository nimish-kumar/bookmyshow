import { TypedDocumentNode, gql } from "@apollo/client";
import { IMoviesListFormatsData, ISlotListData } from "@types";
import {
  QueryListMovieLangByCityArgs,
  QueryListMovieSlotsByCityDateLangArgs,
} from "src/__generated__/graphql";

export const LIST_SLOTS: TypedDocumentNode<
  ISlotListData,
  QueryListMovieSlotsByCityDateLangArgs
> = gql`
  query ($city: ID!, $language: String!, $movie: ID!, $format: String!) {
    listMovieSlotsByCityDateLang(
      city: $city
      language: $language
      movie: $movie
      format: $format
    ) {
      screen {
        theatre {
          id
          name
          areaName
        }
      }
      screeningDatetime
      lang {
        langCode
        name
      }
      format {
        id
        format
      }
      minCost
      maxCost
    }
  }
`;

export const LIST_MOVIES_AND_FORMATS: TypedDocumentNode<
  IMoviesListFormatsData,
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
