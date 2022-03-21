export const returnError = (message, status, id) => {
    const body = { message, status, id };
    return {
        type: "GET_ERROR",
        payload: body,
    };
};

export const clearError = () => {
    return {
        type: "CLEAR_ERROR",
    };
};
