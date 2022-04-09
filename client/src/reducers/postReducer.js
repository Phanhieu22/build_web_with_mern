import {
  POST_LOADING_FAIL,
  POST_LOADING_SUCCESS,
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  UPDATE_POST,
} from "../contexts/constans";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LOADING_SUCCESS: {
      return { ...state, isLoadingPost: false, posts: payload };
    }
    case POST_LOADING_FAIL: {
      return { ...state, isLoadingPost: false, posts: [] };
    }
    case ADD_POST: {
      return { ...state, posts: [...state.posts, payload] };
    }
    case DELETE_POST: {
      const { posts } = state;
      const postsCopy = [...posts];
      const result = postsCopy.filter((post) => {
        return post._id !== payload._id;
      });

      return { ...state, posts: result };
    }
    case FIND_POST: {
      console.log(payload);
      return { ...state, post: payload };
    }
    case UPDATE_POST: {
      const newPostAffterUpdate = state.posts.map((post) => {
        return post._id === payload._id ? payload : post;
      });
      return { ...state, posts: [...newPostAffterUpdate], post: null };
    }
    default: {
      return state;
    }
  }
};
