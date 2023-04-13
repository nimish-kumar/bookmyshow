import { useMutation } from "@apollo/client";
import { FETCH_TOKEN } from "@graphql";
import React from "react";
import { View } from "react-native";

export const Startup = () => {
  const [generateToken, { loading, error, data }] = useMutation(FETCH_TOKEN, {
    variables: { email: "test@bms.com", password: "123" },
  });
  return <View />;
};
