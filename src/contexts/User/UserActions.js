import axios from "axios";
import { returnError } from "../Error/ErrorActions";

export const register =
    ({ username, email, password }) =>
    async (dispatch) => {
        const body = { username, email, password };
        await axios
            .post("/api/auth/local/register", body)
            .then((res) => {
                dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            })
            .catch((err) => {
                dispatch(
                    returnError(
                        err.response.data,
                        err.response.status,
                        "REGISTER_FAIL"
                    )
                );
                dispatch({ type: "REGISTER_FAIL" });
            });
    };

export const login =
    ({ identifier, password }) =>
    async (dispatch) => {
        const body = { identifier, password };
        await axios
            .post("/api/auth/local", body)
            .then((res) => {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            })
            .catch((err) => {
                dispatch(
                    returnError(
                        err.response.data,
                        err.response.status,
                        "LOGIN_FAIL"
                    )
                );
                dispatch({ type: "LOGIN_FAIL" });
            });
    };

export const logout = () => {
    return { type: "LOGIN_SUCCESS" };
};
