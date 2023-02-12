import { useMemo, useState } from 'react';
import {ContextValue} from '../context/Context';
import { fetchAllPosts } from "../actions/posts";
import types from "../actions/types";
import Post from "./Post";
import { fetchAllUsers, fetchSingleUserData } from '../actions/users';

const PostsScreen = () => {
    const [state, dispatch] = ContextValue();
    const [postCount, setPostCount] = useState(state.posts.length);
    
    const getUsers = useMemo(() => fetchAllUsers(dispatch), [postCount]);
    const getPosts = useMemo(() => {fetchAllPosts(dispatch)}, [postCount]);
    
    
    const findUserById = (userId) => {
        for(let i of state.allUsers){
            if(i.id === userId){
                return i;
            }
        }
        return null;
    }
    
    return(
        
        state.posts.map((singlePost,index)=>{
            return <Post postDetails={singlePost} userDetails={findUserById(singlePost.userId)} key={index}/>
        })

    );
}

export default PostsScreen;