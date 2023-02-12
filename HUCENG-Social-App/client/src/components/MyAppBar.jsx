import React from 'react';
import { AppBar, Toolbar, Button, Input, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import theme from "../theme";
import { fetchUsers } from '../actions/users';
import { ContextValue } from '../context/Context';
import types from "../actions/types";

const MyAppBar = () => {
    const [state, dispatch] = ContextValue();

    const style = {
        backgroundColor: theme.nativeRed,
        position:"fixed",
        zIndex: "1",
        paddingRight:150,
        minHeight: 60,
        paddingTop:5,
        paddingLeft:150
    }

    const handleKeyDown = (e) => {
        if(e.key==="Enter"){
            dispatch({
                type: types.CHANGE_SCREEN,
                payload: 2
            });
            if(e.target.value !== ""){
                fetchUsers(e.target.value, dispatch);
            }
        }
    }

    const settingsClick = () => {
        dispatch({
            type: types.CHANGE_SCREEN,
            payload: 5
        });
    }

    const newPostClick = () => {
        if(JSON.parse(localStorage.getItem('user')).role=='Student'){
            alert("You are not authorized!");
        }
        else{
            dispatch({
                type: types.CHANGE_SCREEN,
                payload: 6
            });
        }
    }

    const linkedHuClick = () => {
        dispatch({
            type: types.CHANGE_SCREEN,
            payload: 0
        });
    }
    

    return (
    <AppBar position="static" style={style}>
        <Toolbar variant="dense" style={{display:"flex", justifyContent:"space-between"}}>
            <Button onClick={linkedHuClick} style={{fontWeight:"bold",textDecoration: "none", marginRight: "1em", fontSize: "1em", color:"white"}}>
                <CellTowerOutlinedIcon style={{color:"blue",  marginBottom:5, marginRight:5}}></CellTowerOutlinedIcon>
                LinkedHU
            </Button>
            <Box style={{display:"flex", alignItems:"center"}}>
                <SearchIcon style={{color:"black", opacity:"0.3", paddingTop:3}}/>
                <Input type="search" placeholder='Search User, Post, Comment' style={{width:300}} onKeyDown={handleKeyDown}>
                </Input>
            </Box>
            <Button style={{backgroundColor:"white", fontSize:"15px", color:"black", padding:"5px 15px"}} onClick={newPostClick}>New Post</Button>
            <Button style={{color:"black"}} onClick={settingsClick}><SettingsIcon style={{marginRight:3}}></SettingsIcon> Settings</Button>
            
        </Toolbar>
    </AppBar>
    );

}

export default MyAppBar;
