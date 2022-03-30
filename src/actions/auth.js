import axios from "../config/axiosConfig";
import ErrorAPI from "./error";

//Registration action to be used with context
//Add an errorDispatch to register

const register = async (dispatch, { username, email, password }) => {
    const body = { username, email, password };
    await axios
        .post("/api/auth/local/register", body)
        .then((res) => {
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        })
        .catch((err) => {
            ErrorAPI.returnError(
                dispatch,
                err.response.data,
                err.response.status,
                "REGISTER_FAIL"
            );
            dispatch({ type: "REGISTER_FAIL" });
        });
};

const login = async (dispatch, errorDispatch, { identifier, password }) => {
    const body = { identifier, password };
    await axios
        .post("/api/auth/local", body)
        .then((res) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        })
        .then(() => {
            return axios.get("/api/users/me");
        })
        .then((res) => {
            console.log(res.data)
            dispatch({ type: "USER_LOADED", payload: res.data });
        })
        .catch((err) => {
            console.log(err.response);
            ErrorAPI.returnError(
                errorDispatch,
                err.response.data,
                err.response.status,
                "LOGIN_FAIL"
            );
            dispatch({ type: "LOGIN_FAIL" });
        });
};

const logout = (dispatch) => {
    return dispatch({ type: "LOGOUT_SUCCESS" });
};

const auth = {
    login,
    register,
    logout,
};

export default auth;
