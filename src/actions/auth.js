import axios from "../config/axiosConfig";
import ErrorAPI from "./error";
import { usernameGenerator } from "../utils/usernameGenerator";
import UserAPI from "./user";

//Registration action to be used with context
//Add an errorDispatch to register

const register = async (
    dispatch,
    errorDispatch,
    { name, surname, email, password }
) => {
    UserAPI.count()
        .then((res) => {
            console.log(res);
            const username = usernameGenerator(name, surname, res.toString());
            const body = { username, email, name, surname, password };
            return body;
        })
        .then((res) => {
            return axios.post("/api/auth/local/register", res);
        })
        .then((res) => {
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            return res.data.user.id;
        })
        .then((res) => {
            //NAKON STO REGISTRUJE KORISNIKA, ON GA PRETVORI U EMPLOYEE ULOGU
            return UserAPI.edit(res, { role: 5 });
        })
        .then(() => {
            return UserAPI.getCurrent();
        })
        .then((res) => {
            dispatch({ type: "USER_LOADED", payload: res });
        })
        .catch((err) => {
            ErrorAPI.returnError(
                errorDispatch,
                err.response.data,
                err.response.status,
                "REGISTER_FAIL"
            );
            dispatch({ type: "REGISTER_FAIL" });
        });
};

const login = async (dispatch, errorDispatch, { identifier, password }) => {
    const body = { identifier, password };
    axios
        .post("/api/auth/local", body)
        .then((res) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        })
        .then(() => {
            return UserAPI.getCurrent();
        })
        .then((res) => {
            console.log(res)
            dispatch({ type: "USER_LOADED", payload: res });
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
