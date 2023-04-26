import { TypedDocumentNode, gql } from "@apollo/client";
import {
  IMoviesListFormatsData,
  ISlotDetailsData,
  ISlotListData,
} from "@types";
import {
  QueryGetSlotDetailsArgs,
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
      id
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

export const GET_SLOT_DETAILS: TypedDocumentNode<
  ISlotDetailsData,
  QueryGetSlotDetailsArgs
> = gql`
  query ($id: ID!) {
    getSlotDetails(id: $id) {
      screen {
        layout
      }
    }
  }
`;
