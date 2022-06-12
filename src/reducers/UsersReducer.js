
const UsersReducer = (state = null, action) => {
    switch (action.type) {
        case "getUsers":
            return action.data;
        default:
            return state;
    }
}

export default UsersReducer;
