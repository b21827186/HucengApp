import React from 'react';
import { Avatar, Card } from '@mui/material';
import { CardActionArea } from '@material-ui/core';

import types from '../actions/types';
import { ContextValue } from '../context/Context';

const SideProfileBar = () => {
    const [state, dispatch] = ContextValue();

    const styles = {
        cardStyle: {
            height:220,
            margin:"0px 50px",
            alignItems:"end"
        },
        avatar: {
            height: 70,
            width: 70,
            marginRight:20
        },
    
    };

    const handleClick = () => {
        dispatch({
            type:types.FETCH_SINGLE_USER,
            payload: JSON.parse(localStorage.getItem("user"))
        });
        dispatch({
            type:types.CHANGE_SCREEN,
            payload: 3
        });
        
    }

    return (
        <Card style={styles.cardStyle} sx={{display:"flex"}}>
            <CardActionArea style={{display:"flex", alignItems:"start", justifyContent:"start", padding:10}} onClick={()=>{handleClick()}}>
                <Avatar src={JSON.parse(localStorage.getItem("user")).image}
                alt="Bilgehan Aygün" style={styles.avatar} />
                    
                <span style={{marginTop:5, whiteSpace:"break-spaces", fontSize:25}}>
                    {JSON.parse(localStorage.getItem("user")).name}
                    <br/>
                    <span style={{fontSize:15}}>
                        Role: {JSON.parse(localStorage.getItem("user")).role}
                    </span>
                </span>
                
            </CardActionArea>
        </Card>
    );
}


export default SideProfileBar;
