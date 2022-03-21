const ErrorReducer = (state, action) => {
    switch (action.type) {
        case "GET_ERROR":
            return {
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id,
            };
        case "CLEAR_ERROR":
            return {
                message: null,
                status: null,
                id: null,
            };
        default:
            return state;
    }
};

export default ErrorReducer;
