import types from "./types";
import axios from 'axios';


const homeUrl = "http://localhost:8095/post";


export const publishPost = async (postData) => {
    return axios.post(homeUrl, postData);
}

export const fetchAllPosts = async (dispatch) => {
    return axios.get(homeUrl+"/all").then(res=>{
        dispatch({
            type: types.FETCH_POSTS,
            payload: res.data
        });
    }).catch(err=>{
        console.log(err);
    });
}

export const fetchPostsById = async (userId, dispatch) => {
    return axios.get(homeUrl + `/user/${userId}`).then(res=>{
        dispatch({
            type: types.FETCH_USERS_POSTS,
            payload: res.data
        })
    }).catch(err=>{
        console.log(err);
    })

}

export const deletePostById = async(postId) => {
    return axios.delete(homeUrl + `/delete/${postId}`).then(res=>{
        alert("success");
    }).catch(err=>{
        console.log(err);
    });
}