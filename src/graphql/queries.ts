import { TypedDocumentNode, gql } from "@apollo/client";
import {
  IGetUserDetailsData,
  IListBookingDetailsData,
  IMoviesListFormatsData,
  ISlotDetailsData,
  ISlotListData,
} from "@types";
import {
  QueryGetSlotDetailsArgs,
  QueryListBookingDetailsArgs,
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
  query ($city: ID!, $page: Int!, $limit: Int!) {
    listMovieLangByCity(city: $city, page: $page, limit: $limit) {
      prevPage
      nextPage
      count
      results {
        movie {
          id
          name
          posterUrl
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
  }
`;

export const GET_SLOT_DETAILS: TypedDocumentNode<
  ISlotDetailsData,
  QueryGetSlotDetailsArgs
> = gql`
  query ($id: ID!) {
    getSlotDetails(id: $id) {
      currentLayout
    }
  }
`;

export const LIST_MOVIE_BOOKINGS: TypedDocumentNode<
  IListBookingDetailsData,
  QueryListBookingDetailsArgs
> = gql`
  query ($page: Int!, $limit: Int!) {
    listBookingDetails(page: $page, limit: $limit) {
      prevPage
      nextPage
      count
      results {
        id
        slotGrp {
          name
          grpCode
          slot {
            screeningDatetime
            movie {
              name
              posterUrl
            }
            lang {
              name
            }
            format {
              format
            }
            screen {
              theatre {
                name
                areaName
              }
              screenId
            }
          }
        }
        seatNumber
        status
        row
      }
    }
  }
`;

export const GET_USER_DETAILS: TypedDocumentNode<IGetUserDetailsData> = gql`
  query {
    getUserDetails {
      firstName
      lastName
      email
      profileImageUrl
    }
  }
`;
