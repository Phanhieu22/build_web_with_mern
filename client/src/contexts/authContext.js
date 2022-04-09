import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STOGARE_TOKEN_NAME } from "./constans";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const initState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
};

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initState);

  // check user is authorization
  const loadUser = async () => {
    if (localStorage[LOCAL_STOGARE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STOGARE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);

      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STOGARE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  // register feature
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        // lưu token vào local storage
        localStorage.setItem(
          LOCAL_STOGARE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };
  // login feature
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        // lưu token vào local storage
        localStorage.setItem(
          LOCAL_STOGARE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };
  const logout = () => {
    setAuthToken(null);
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
    localStorage.removeItem(LOCAL_STOGARE_TOKEN_NAME);
  };

  const authContextData = {
    loginUser,
    authState: authState,
    registerUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
