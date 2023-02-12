import types from "./types";
import axios from 'axios';

const homeUrl = "http://localhost:8095";

export const fetchUsers = async (search_name, dispatch) => {
    
    axios.get(homeUrl + `/search/${search_name}`)
    .then(res=>{
        dispatch({
            type: types.FETCH_USERS,
            payload: res.data
          });
    })
    .catch(err => {
        console.log(err);
    });
}

export const fetchAllUsers = async (dispatch) => {
    return axios.get(homeUrl + `/users/all`).then(res=>{
        dispatch({
            type: types.FETCH_ALL_USERS,
            payload: res.data
        });
    }).catch(err=>{
        console.log(err);
    })
}

export const fetchSingleUser = async (search_id, dispatch) => {
    return axios.get(homeUrl + `/users/${search_id}`);
}

export const fetchSingleUserData = async(userId) => {
    return axios.get(homeUrl + `/users/${userId}`);
}

export const changeUserData = async (userData, dispatch) => {
    axios.post(homeUrl + `/users/userdata`, userData)
    .then(res=>{
        if(res.data.id === userData.id){
            alert("Success");
        }
        else{
            alert("Failed");
        }
        
    })
    .catch(err=>{
        console.log(err);
    })
}

export const register = async (userData) => {
    return axios.post(homeUrl + "/register", userData);
}

export const login = async (userData) => {
    return axios.post(homeUrl + "/login", userData);
}

export const renewPassword = async (passwordData) => {
    return axios.post(homeUrl + "/users/changepassword", passwordData);
}

export const updateRole = async (newRoleData) => {
    return axios.post(homeUrl + "/users/userrole", newRoleData);
}