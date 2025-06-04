// import axios from "axios";
import api from "../../utils/api";
import { authActions } from "../auth-slice";
import { uiActions } from "../ui-slice";

export const login = (payload) => {
  return async (dispatch) => {
    dispatch(uiActions.loginLoading());

    const postData = async () => {
      const response = await api.post("/api/users/login", payload);

      const data = await response.data;
      return data;
    };

    try {
      const user = await postData();
      await dispatch(authActions.login(user));
      dispatch(uiActions.loginLoading());
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(uiActions.setLoginError(error.response.data.error));
      } else {
        dispatch(uiActions.setLoginError("Network error"));
      }
      dispatch(uiActions.loginLoading(false));
    }
  };
};

export const register = (payload) => {
  return async (dispatch) => {
    dispatch(uiActions.registerLoading());
    // await api.get("/sanctum/csrf-cookie");
    //Bảo vệ các request POST/PUT/DELETE khỏi các cuộc tấn công CSRF.

    const postData = async () => {
      const response = await api.post("/api/users/register", payload);

      const data = await response.data;
      return data;
    };

    try {
      const user = await postData();
      await dispatch(authActions.register(user));
      dispatch(uiActions.registerLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    const logout = async () => {
      const response = await api.post("/api/users/logout", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
        // withCredentials: true
      });
      const message = response.data;
      return message;
    };

    try {
      // await logout();
      console.log();
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error);
    }
  };
};

// export const login = (payload) => {
//   return async (dispatch) => {
//     dispatch(uiActions.loginLoading(true)); // bật loading

//     const postData = async () => {
//       const response = await api.post("/api/users/login", payload);
//       const data = await response.data;
//       return data;
//     };

//     try {
//       const user = await postData();
//       dispatch(authActions.login(user));
//       dispatch(uiActions.setLoginError(null)); // xóa lỗi nếu có
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         dispatch(uiActions.setLoginError(error.response.data.error));
//       } else {
//         dispatch(uiActions.setLoginError("Network error"));
//       }
//       dispatch(uiActions.loginLoading(false));
//     }
//   };
// };

// export const register = (payload) => {
//   return async (dispatch) => {
//     dispatch(uiActions.registerLoading(true)); // bật loading

//     const postData = async () => {
//       const response = await api.post("/api/users/register", payload);
//       const data = await response.data;
//       return data;
//     };

//     try {
//       const user = await postData();
//       await dispatch(authActions.register(user));
//       dispatch(uiActions.setRegisterError(null)); // xóa lỗi nếu có
//     } catch (error) {
//       if (error.response && error.response.status >= 400) {
//         const msg = error.response.data.error || "Register failed";
//         dispatch(uiActions.setRegisterError(msg));
//       } else {
//         dispatch(uiActions.setRegisterError("Network or server error"));
//       }
//     } finally {
//       dispatch(uiActions.registerLoading(false)); // tắt loading
//     }
//   };
// };