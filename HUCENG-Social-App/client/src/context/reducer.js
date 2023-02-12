import types from '../actions/types';

export const initialState = {
    searchedUsers: [],
    currentUser: null,
    allUsers: [],
    posts: [],
    currentPost: null,
    usersPosts: [],
    screenNum: -1
};

const reducer = (state, action) => {
    switch(action.type){
        case types.FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case types.FETCH_SINGLE_POST:
            return {
                ...state,
                currentPost: action.payload
            };
        case types.FETCH_USERS:
            return {
                ...state,
                searchedUsers:action.payload
            };
        case types.FETCH_SINGLE_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case types.FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            };
        case types.CHANGE_SCREEN:
            return {
                ...state, 
                screenNum: action.payload
            };
        case types.FETCH_USERS_POSTS:
            return{
                ...state,
                usersPosts: action.payload
            };
        default:
            return {...state};
    }
}

export default reducer;