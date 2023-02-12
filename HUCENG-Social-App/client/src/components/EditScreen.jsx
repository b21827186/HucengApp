import React, { useState } from 'react';
import { ContextValue } from '../context/Context';
import { Avatar, Box, Typography, Card, Divider, TextField, Button, Switch } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import ImageIcon from '@mui/icons-material/Image';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import theme from "../theme";
import { changeUserData, fetchSingleUser } from '../actions/users';
import types from "../actions/types";


const EditScreen = () => {
    const [state, dispatch] = ContextValue();
    const [formValues, setFormValues] = useState({
        ...JSON.parse(localStorage.getItem("user")), cvVisible:true
        });

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
            
            marginBottom:3,
            paddingBottom:5,
            paddingTop:5,
        },
        buttonStyle:{
            backgroundColor: theme.nativeRed,
            color:"white",
            fontSize:"15px",
            padding:"5px 15px"
        },
    }
    

    const personalData = [
        "Role: ",
        "Name: ",
        "Web Page: ",
        "Image Link:",
        "CV Link"
    ]


    const icons = [
        <BadgeIcon style={{marginRight:7}}></BadgeIcon>,
        <PersonIcon style={{marginRight:7}}></PersonIcon>,
        <LanguageIcon style={{marginRight:7}}></LanguageIcon>,
        <ImageIcon style={{marginRight:7}}></ImageIcon>,
        <DocumentScannerIcon style={{marginRight:7}}></DocumentScannerIcon>
    ]

    const textData = ["role","name", "webpage", "image", "cv"];


    const handleSubmit = () => {
        localStorage.setItem("user", JSON.stringify(formValues));
        changeUserData(formValues);
        dispatch({
            type:types.FETCH_SINGLE_USER,
            payload: formValues
        });
        dispatch({
            type: types.CHANGE_SCREEN,
            payload: 3
        });
    }


    if(state.currentUser){
        return(
            <div>
                <Card>
                    <Box style={styles.headerBox}>
                        <Avatar src={formValues.image} style={{width:125, height:125, margin:10}}></Avatar>
                        <Typography variant="h4">
                            {state.currentUser.name}
                        </Typography>
                        
                    </Box>
                    <Divider></Divider>
                    <Box style={{padding:20}}>
                            {
                                personalData.map((element,index)=>{
                                    return(
                                        <span style={styles.dataSpan} key={index+10}>
                                            <TextField size="small" variant="standard" value={formValues[textData[index]]}
                                            style={{width:"100%"}}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start">{icons[index]}</InputAdornment>),
                                                readOnly: index===0
                                            }}
                                            label={element} onChange={(e) => {setFormValues({...formValues, [textData[index]]: e.target.value});}}
                                            >
                                                
                                            </TextField>
                                        </span>
                                        
                                    );
                                })
                            }
                            
                            <span style={styles.dataSpan}>
                                CV Visible: <Switch defaultChecked onChange={(e) => {setFormValues({...formValues, cvVisible:e.target.checked})}}/>
                            </span>
                            <hr></hr>
                            <span style={{display:"flex", justifyContent:"center", marginTop:15}}>
                                <Button style={styles.buttonStyle} onClick={handleSubmit}>
                                    Submit Changes
                                </Button>
                            </span>

                    </Box>
                </Card>
            </div>
        )
    }
    else{
        return <div></div>
    }

}

export default EditScreen;
