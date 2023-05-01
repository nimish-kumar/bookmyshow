/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type ArtistType = {
  __typename?: 'ArtistType';
  castMovies: Array<MovieType>;
  crewMovies: Array<MovieType>;
  gender: MetaArtistGenderChoices;
  id: Scalars['ID'];
  name: Scalars['String'];
  profilePicUrl?: Maybe<Scalars['String']>;
};

export type BookingSlotType = {
  __typename?: 'BookingSlotType';
  currentLayout?: Maybe<Scalars['String']>;
  format?: Maybe<MovieFormatType>;
  id: Scalars['ID'];
  isFullyBooked: Scalars['Boolean'];
  lang: LanguageType;
  maxCost?: Maybe<Scalars['Int']>;
  minCost?: Maybe<Scalars['Int']>;
  movie: MovieType;
  screen: ScreenType;
  screeningDatetime: Scalars['DateTime'];
  slotgrpBooking: Array<SlotGroupType>;
  subtitlesLang?: Maybe<LanguageType>;
};

export type BookingType = {
  __typename?: 'BookingType';
  column: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  paidAmt?: Maybe<Scalars['Int']>;
  row: Scalars['String'];
  seatNumber: Scalars['Int'];
  slotGrp: SlotGroupType;
  status: MoviesBookingStatusChoices;
  user?: Maybe<UserType>;
};

export type CityType = {
  __typename?: 'CityType';
  cityTheatres: Array<TheatreType>;
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  state: MetaCityStateChoices;
};

export type DirectBookingTicket = {
  __typename?: 'DirectBookingTicket';
  ticketDetails?: Maybe<Array<Maybe<BookingType>>>;
};

export type FacilityType = {
  __typename?: 'FacilityType';
  facilityTheatres: Array<TheatreType>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority: MetaFacilityPriorityChoices;
};

export type GenreType = {
  __typename?: 'GenreType';
  genreMovies: Array<MovieType>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LanguageFormatType = {
  __typename?: 'LanguageFormatType';
  formats?: Maybe<Array<Maybe<MovieFormatType>>>;
  lang?: Maybe<LanguageType>;
};

export type LanguageType = {
  __typename?: 'LanguageType';
  id: Scalars['ID'];
  langCode: Scalars['String'];
  langMovies: Array<MovieType>;
  movieLangSlots: Array<BookingSlotType>;
  name: Scalars['String'];
  subtitleLangMovies: Array<MovieType>;
  subtitleLangSlots: Array<BookingSlotType>;
};

export enum MetaArtistGenderChoices {
  /** Male */
  A_0 = 'A_0',
  /** Female */
  A_1 = 'A_1',
  /** Trans */
  A_2 = 'A_2'
}

export enum MetaCityStateChoices {
  /** Andhra Pradesh */
  A_1 = 'A_1',
  /** Arunachal Pradesh */
  A_2 = 'A_2',
  /** Assam */
  A_3 = 'A_3',
  /** Bihar */
  A_4 = 'A_4',
  /** Chhattisgarh */
  A_5 = 'A_5',
  /** Goa */
  A_6 = 'A_6',
  /** Gujarat */
  A_7 = 'A_7',
  /** Haryana */
  A_8 = 'A_8',
  /** Himachal Pradesh */
  A_9 = 'A_9',
  /** Jharkhand */
  A_10 = 'A_10',
  /** Karnataka */
  A_11 = 'A_11',
  /** Kerala */
  A_12 = 'A_12',
  /** Madhya Pradesh */
  A_13 = 'A_13',
  /** Maharashtra */
  A_14 = 'A_14',
  /** Manipur */
  A_15 = 'A_15',
  /** Meghalaya */
  A_16 = 'A_16',
  /** Mizoram */
  A_17 = 'A_17',
  /** Nagaland */
  A_18 = 'A_18',
  /** Odisha */
  A_19 = 'A_19',
  /** Punjab */
  A_20 = 'A_20',
  /** Rajasthan */
  A_21 = 'A_21',
  /** Sikkim */
  A_22 = 'A_22',
  /** Tamil Nadu */
  A_23 = 'A_23',
  /** Telangana */
  A_24 = 'A_24',
  /** Tripura */
  A_25 = 'A_25',
  /** Uttar Pradesh */
  A_26 = 'A_26',
  /** Uttarakhand */
  A_27 = 'A_27',
  /** West Bengal */
  A_28 = 'A_28',
  /** Andaman and Nicobar Islands */
  A_29 = 'A_29',
  /** Chandigarh */
  A_30 = 'A_30',
  /** Dadra and Nagar Haveli and Daman and Diu */
  A_31 = 'A_31',
  /** Delhi */
  A_32 = 'A_32',
  /** Jammu and Kashmir */
  A_33 = 'A_33',
  /** Ladakh */
  A_34 = 'A_34',
  /** Lakshadweep */
  A_35 = 'A_35',
  /** Puducherry */
  A_36 = 'A_36'
}

export enum MetaFacilityPriorityChoices {
  /** Lo */
  A_1 = 'A_1',
  /** Md */
  A_2 = 'A_2',
  /** Hi */
  A_3 = 'A_3'
}

export type MovieDetailsType = {
  __typename?: 'MovieDetailsType';
  langs?: Maybe<Array<Maybe<LanguageFormatType>>>;
  movie?: Maybe<MovieType>;
};

export type MovieFormatType = {
  __typename?: 'MovieFormatType';
  format: Scalars['String'];
  formatMovies: Array<MovieType>;
  formatSlot: Array<BookingSlotType>;
  id: Scalars['ID'];
};

export type MovieType = {
  __typename?: 'MovieType';
  cast: Array<ArtistType>;
  crew: Array<ArtistType>;
  description?: Maybe<Scalars['String']>;
  format: Array<MovieFormatType>;
  genre: Array<GenreType>;
  id: Scalars['ID'];
  isReleased: Scalars['Boolean'];
  lang: Array<LanguageType>;
  /** Movie length in hours */
  movieLength: Scalars['Float'];
  movieSlots: Array<BookingSlotType>;
  movieTrailers: Array<TrailerUrlType>;
  name: Scalars['String'];
  posterUrl?: Maybe<Scalars['String']>;
  releaseDate: Scalars['Date'];
  subtitlesLang: Array<LanguageType>;
};

export enum MoviesBookingStatusChoices {
  /** Available */
  A_0 = 'A_0',
  /** In Progress */
  A_1 = 'A_1',
  /** Payment Failed */
  A_2 = 'A_2',
  /** Payment Done */
  A_3 = 'A_3',
  /** Booked */
  A_4 = 'A_4',
  /** Error */
  A_5 = 'A_5'
}

export type Mutation = {
  __typename?: 'Mutation';
  bookTickets?: Maybe<DirectBookingTicket>;
  refreshToken?: Maybe<Refresh>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateUser?: Maybe<UpdateUserDetails>;
};


export type MutationBookTicketsArgs = {
  seats?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slotId: Scalars['ID'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type PaginatedBookingType = {
  __typename?: 'PaginatedBookingType';
  count?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<BookingType>>>;
};

export type PaginatedMoviesListFormats = {
  __typename?: 'PaginatedMoviesListFormats';
  count?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<MovieDetailsType>>>;
};

export type Query = {
  __typename?: 'Query';
  getSlotDetails?: Maybe<BookingSlotType>;
  getUserDetails?: Maybe<UserType>;
  listBookingDetails?: Maybe<PaginatedBookingType>;
  listCities?: Maybe<Array<Maybe<CityType>>>;
  listMovieLangByCity?: Maybe<PaginatedMoviesListFormats>;
  listMovieSlotsByCityDateLang?: Maybe<Array<Maybe<BookingSlotType>>>;
};


export type QueryGetSlotDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryListBookingDetailsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page: Scalars['Int'];
};


export type QueryListMovieLangByCityArgs = {
  city: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  page: Scalars['Int'];
};


export type QueryListMovieSlotsByCityDateLangArgs = {
  city: Scalars['ID'];
  format: Scalars['String'];
  language: Scalars['String'];
  movie: Scalars['ID'];
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type ScreenType = {
  __typename?: 'ScreenType';
  id: Scalars['ID'];
  layout: Scalars['String'];
  screenId: Scalars['String'];
  screenSlots: Array<BookingSlotType>;
  theatre: TheatreType;
};

export type SlotGroupType = {
  __typename?: 'SlotGroupType';
  cost: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  grpCode: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slot: BookingSlotType;
  slotGrp: Array<BookingType>;
};

export type TheatreType = {
  __typename?: 'TheatreType';
  address: Scalars['String'];
  areaName: Scalars['String'];
  city: CityType;
  coordinates?: Maybe<Scalars['String']>;
  facilities: Array<FacilityType>;
  id: Scalars['ID'];
  locationLink?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['Int'];
  theatreScreen: Array<ScreenType>;
};

export type TrailerUrlType = {
  __typename?: 'TrailerUrlType';
  id: Scalars['ID'];
  movie: MovieType;
  trailerUrl: Scalars['String'];
};

export type UpdateUserDetails = {
  __typename?: 'UpdateUserDetails';
  userDetails?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profileImageUrl?: Maybe<Scalars['String']>;
};
