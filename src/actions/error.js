const returnError = (dispatch, message, status, id) => {
    const body = { message, status, id };
    return dispatch({
        type: "GET_ERROR",
        payload: body,
    });
};

const clearError = (dispatch) => {
    return dispatch({
        type: "CLEAR_ERROR",
    });
};

export default {
    returnError,
    clearError,
};
