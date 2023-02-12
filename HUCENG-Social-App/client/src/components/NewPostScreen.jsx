import React,{useState} from 'react';
import {ContextValue} from '../context/Context';
import { Avatar, Box, Typography, RadioGroup, Radio, FormControl, FormControlLabel,FormLabel, Divider, Button, TextField } from "@mui/material";
import theme from "../theme";
import types from "../actions/types";
import { publishPost } from '../actions/posts.js';

const NewPostScreen = () => {
    const [state, dispatch] = ContextValue();
    const [isDefault, setIsDefault] = useState(true);

    var today = new Date();
    var currentDay = today.getFullYear()+'-';
    if(today.getMonth()+1 < 10){
        currentDay = currentDay + "0" + (today.getMonth()+1)+'-';
    }
    else{
        currentDay = currentDay + (today.getMonth()+1)+'-';
    }

    if(today.getDate()<10){
        currentDay = currentDay + "0" + today.getDate();
    }
    else{
        currentDay = currentDay + today.getDate();
    }

    var currentDayTime = currentDay + " 23:59";
    
    const handleChange = (value) => {
        if(value===isDefault){
            return;
        }
        else{
            setIsDefault(value);
        }
    }

    const handleSubmit = () => {
        let postContent = document.getElementById("standard-basic1").value;
        let imageLink = document.getElementById("standard-basic").value;
        if(postContent===""){
            alert("Content must not be empty.");
            return;
        }
        if(!isDefault){
            let eventDate = document.getElementById("standard-basicE").value;
            let eventLink = document.getElementById("standard-basicL").value;
            if(eventDate < currentDay){
                alert("Event must not be scheduled in past!");
                return;
            }
            if(eventLink === ""){
                alert("Event link must not be empty.");
                return;
            }

            publishPost({type:"Event",userId:JSON.parse(localStorage.getItem('user')).id,content:postContent, imageLink:imageLink ,eventDate:eventDate , eventLink:eventLink}).then(res=>{
                if(res.data.message.includes("success")){
                    alert("success");
                    dispatch({
                        type:types.CHANGE_SCREEN,
                        payload:0
                    })
                }
                else{
                    alert("Error");
                }
            })
            .catch(err=>{
                console.log(err);
            });

        }//if block
        else{
            publishPost({type:"Default",userId:JSON.parse(localStorage.getItem('user')).id,content:postContent, imageLink:imageLink}).then(res=>{
                if(res.data.message.includes("success")){
                    alert("success");
                    dispatch({
                        type:types.CHANGE_SCREEN,
                        payload:0
                    });
                }
                else{
                    alert("Error");
                }
            })
            .catch(err=>{
                console.log(err);
            });
            

        }//else block        
    }



    const styles = {
        textFieldStyle:{
            width:"100%",
            marginBottom:20
        },
        buttonStyle:{backgroundColor: theme.nativeRed, color:"white", fontSize:"15px", padding:"5px 15px", marginTop:20}
    }

    return (
        <Box style={{paddingTop:10, textAlign:"center"}}>
            <FormControl style={{marginBottom:20}}>
                <FormLabel id="demo-radio-buttons-group-label" style={{color:"black"}}>Post Type</FormLabel>
                <RadioGroup row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="default"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="default" control={<Radio checked={isDefault} onChange={()=>{handleChange(true)}} />} label="default" />
                    <FormControlLabel value="event" control={<Radio checked={!isDefault} onChange={()=>{handleChange(false)}} />} label="event" />
                </RadioGroup>
                </FormControl>

            <TextField id="standard-basic1" label="Content" variant="standard" style={styles.textFieldStyle} multiline={true}/>
            <TextField id="standard-basic" label="Image Link" variant="standard" style={styles.textFieldStyle} multiline={true}/>
            {isDefault ? null : 
                    <Box>
                        <TextField id="standard-basicE" label="Event Date" defaultValue={currentDayTime.toString()} variant="standard" style={styles.textFieldStyle} multiline={true}/>
                        <TextField id="standard-basicL" label="Event Link" variant="standard" style={styles.textFieldStyle} multiline={true}/>
                    </Box>
            }
            <Button style={styles.buttonStyle} onClick={handleSubmit} >Publish</Button>
            
        </Box>
    );
    
    
                    

}

export default NewPostScreen;
