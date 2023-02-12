import React from 'react';
import {ContextValue} from '../context/Context';
import { Card, Typography, Avatar, CardActionArea } from "@mui/material";

import types from "../actions/types";


const SearchScreen = () => {
    const [state, dispatch] = ContextValue();
    const styles = {
        cardStyle:{
            padding:"10px 10px",
            display:"flex",
            flexDirection:"row",
            justifyContent:"start",
            //alignItems:"start" put names to the top
        },
        avatarStyle:{
            width:60,
            height:60,
            marginRight:20
        }
    };

    const handleClick = (id) => {
        dispatch({
            type: types.CHANGE_SCREEN,
            payload: 3
        });
        //find user by id from users, save it as current user
        for(let i=0;i<state.searchedUsers.length;i++){
            if(state.searchedUsers[i].id === id){
                
                dispatch({
                    type: types.FETCH_SINGLE_USER,
                    payload: state.searchedUsers[i]
                });
                break;
            }
        }
    }
    
    return (

        
        state.searchedUsers.map((element,index)=>{
            return(
                <Card key={element.id} style={{marginBottom:5, }}>
                    <CardActionArea onClick={()=>{handleClick(element.id)}} style={styles.cardStyle}>
                        <Avatar style={styles.avatarStyle} src={element.image}>

                        </Avatar>
                        <span style={{whiteSpace:"break-spaces", fontSize:25}}>
                            {element.name}
                            <br/>
                            <span style={{fontSize:15}}>
                                Role: {element.role}
                            </span>
                        </span>
                    </CardActionArea>
                </Card>
            )
        })
        
    );

}

export default SearchScreen;
