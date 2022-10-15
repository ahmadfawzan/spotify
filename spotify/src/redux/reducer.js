import { configureStore } from "@reduxjs/toolkit";
import { get_accessToken } from "./actionTypes";
import { get_user } from "./actionTypes";
import { get_mp3Track } from "./actionTypes";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
const getAccessToken = (state = null, action) => {
  switch (action.type) {
    case get_accessToken.type:
      return action.spotify;

    default:
      return state;
  }
};
const getUser = (state = null, action) => {
  switch (action.type) {
    case get_user.type:
      return action.user;

    default:
      return state;
  }
};
const getMp3Track = (state = null, action) => {
  switch (action.type) {
    case get_mp3Track.type:
      return action.track;
    default:
      return state;
  }
};
export const store = configureStore({
  reducer: {
    getAccessToken: getAccessToken,
    getUser: getUser,
    getMp3Track: getMp3Track,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
