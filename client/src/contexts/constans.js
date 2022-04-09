export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://https://guarded-harbor-09635.herokuapp.com/:5000/api"
    : "someApiUrl";
export const LOCAL_STOGARE_TOKEN_NAME = "learnint";

export const POST_LOADING_SUCCESS = "POST_LOADING_SUCCESS";
export const POST_LOADING_FAIL = "POST_LOADING_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const FIND_POST = "FIND_POST";
export const UPDATE_POST = "UPDATE_POST";
