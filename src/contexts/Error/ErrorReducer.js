const ErrorReducer = (state, action) => {
    switch (action.type) {
        case "GET_ERROR":
            return {
                ...state,
            };
        case "CLEAR_ERROR":
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default ErrorReducer;
