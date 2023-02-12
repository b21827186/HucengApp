import React, { useMemo } from 'react';
import {ContextValue} from '../context/Context';
import { Avatar, Box, Typography, Card, Divider, Button } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import types from '../actions/types';
import { fetchPostsById } from '../actions/posts';
import Post from './Post';


const ProfileScreen = () => {
    const [state, dispatch] = ContextValue();

    const getUsersPosts = useMemo(()=>{fetchPostsById(state.currentUser.id, dispatch)} ,[]);


    const styles = {
        headerBox:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            padding:15
        },
        dataSpan:{
            display:"flex",
            alignItems:"center",
            borderBottom:"1px solid black",
            marginBottom:7
        }
    }
    
    const personalData = [];
    if(state.currentUser){
        personalData.push(
            "Role: " + (state.currentUser.role ? state.currentUser.role + "\n" : "\n"),
            "Web Page: " + (state.currentUser.webpage ? state.currentUser.role + "\n" : "\n"),
            "CV Link: " + (state.currentUser.cv ? (state.currentUser.cvVisible ? state.currentUser.cv : "This users CV is private.") : "Not provided.")
        );
    }
    

    const icons = [
        <BadgeIcon style={{marginRight:7}}></BadgeIcon>,
        <LanguageIcon style={{marginRight:7}}></LanguageIcon>,
        <CalendarTodayIcon style={{marginRight:7}}></CalendarTodayIcon>,
        <StarIcon style={{marginRight:7}}></StarIcon>
    ]
        
        
    const handleEditClick = () => {
        dispatch({
            type:types.CHANGE_SCREEN,
            payload: 4
        });
    }
    

    if(state.currentUser){
        if(state.currentUser.id === JSON.parse(localStorage.getItem('user')).id){
            var editButton = <Button stlye={{marginTop:7, marginRight:10}} onClick={handleEditClick} ><EditIcon style={{color:"black"}}></EditIcon></Button>
        }

    
        return(
            <div>
                <Card style={{marginBottom:50}}>
                    <span style={{display:"flex", justifyContent:"end", paddingRight:5, paddingTop:5}}>
                    {editButton ? editButton : ""}
                    </span>
                    <Box style={styles.headerBox}>
                        <Avatar src={state.currentUser.image} style={{width:125, height:125, margin:10}}></Avatar>
                        <Typography variant="h4">
                            {state.currentUser.name}
                        </Typography>
                        
                    </Box>
                    <Divider></Divider>
                    <Box style={{padding:20, paddingBottom:5}}>
                        <Typography style={{whiteSpace:"break-spaces"}} variant="h6">
                            {
                                personalData.map((element,index)=>{
                                    return(
                                        <span style={styles.dataSpan} key={index+10}>
                                            {icons[index]}
                                            {element}
                                        </span>
                                        
                                    );
                                })
                            }
                            
                        </Typography>
                        
                    </Box>
                    <Box>
                        <img></img>
                    </Box>
                </Card>
                {
                    state.usersPosts.map((element,index)=>{
                        return(
                            <Post postDetails={element} userDetails={state.currentUser} key={index} />
                        )
                    })
                }
            </div>
        )
    }
    else{
        return <div></div>
    }

}

export default ProfileScreen;
