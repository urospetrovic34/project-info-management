const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            // localStorage.setItem('token',action)
            return {
                ...state,
            };
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
        case "LOGOUT_SUCCESS":
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default UserReducer;
