const returnError = (dispatch, message, status, id) => {
    const body = { message, status, id };
    console.log(body)
    return dispatch({
        type: "RETURN_ERROR",
        payload: body,
    });
};

const clearError = (dispatch) => {
    return dispatch({
        type: "CLEAR_ERROR",
    });
};

const error = {
    returnError,
    clearError,
};

export default error;
