import { createContext, useReducer, useState } from "react";

import axios from "axios";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  POST_LOADING_SUCCESS,
  FIND_POST,
  UPDATE_POST,
} from "./constans";

export const PostContexts = createContext();

const initalState = {
  post: null,
  posts: [],
  isLoadingPost: true,
};
const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, initalState);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showToats, setShowToats] = useState({
    show: false,
    title: null,
    message: null,
  });

  //findPost
  const findPost = (postId) => {
    dispatch({
      type: FIND_POST,
      payload: postState.posts.find((post) => {
        return post._id === postId;
      }),
    });
  };
  // update post

  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatePost._id}`,
        updatePost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  // close toats
  const closeToast = () => {
    setShowToats({ ...showToats, show: false });
  };

  // close models
  const closeMolels = () => {
    setShowAddModal(false);
  };

  // get all posts start
  const getAllPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POST_LOADING_SUCCESS,
          payload: response.data.post,
        });
      }
    } catch (error) {
      dispatch({
        type: POST_LOADING_SUCCESS,
      });
    }
  };
  // get all posts end

  // create a post start

  const createAPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data.post;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // create a post end

  // del a post start
  const deletePost = async (_id) => {
    try {
      const {
        data: { success, message, post },
      } = await axios.delete(`${apiUrl}/posts/${_id}`);
      if (success) {
        dispatch({ type: DELETE_POST, payload: post });
        return post;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // del a post end
  const postContextData = {
    getAllPost,
    postState,
    showAddModal,
    setShowAddModal,
    closeMolels,
    createAPost,
    showToats,
    setShowToats,
    deletePost,
    updatePost,
    findPost,
    showUpdateModal,
    setShowUpdateModal,
  };
  return (
    <PostContexts.Provider value={postContextData}>
      {children}
    </PostContexts.Provider>
  );
};
export default PostContextProvider;
