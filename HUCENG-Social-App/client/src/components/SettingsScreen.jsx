import React, { useState } from 'react';
import { ContextValue } from '../context/Context';
import { Typography, Card, TextField, Button} from "@mui/material";
import theme from "../theme";
import { renewPassword } from '../actions/users';
import types from "../actions/types";


const SettingsScreen = () => {
    const [state, dispatch] = ContextValue();
    const [formValues, setFormValues] = useState({oldPassword: "",newPassword: "",confirmNew: ""});
    const [errorState, setErrorState] = useState(-1);

    const errors = [
        "Invalid new password!", "Invalid old password!", "Passwords doesn't match!", "Incorrect old password!"
    ];

    const textData = ["oldPassword","newPassword", "confirmNew"];
    const personalData = [
        "Old Password",
        "New Password",
        "Confirm New Password",
    ];

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
            padding:"5px 15px",
            marginTop:"50px",
        },
    }

    const handleSubmit = () => {
        if(formValues.newPassword===""){
            setErrorState(0);
        }
        else if(formValues.oldPassword===""){
            setErrorState(1);
        }
        else if(formValues.newPassword!==formValues.confirmNew){
            setErrorState(2);
        }
        else{
            renewPassword({id:state.currentUser.id, oldPassword: formValues.oldPassword, newPassword: formValues.newPassword}).then(res=>{
                console.log(res.data);
                if(res.data.message.includes("wrong")){
                    setErrorState(3);
                }
                else{
                    alert("success");
                    dispatch({
                        type:types.CHANGE_SCREEN,
                        payload:3
                    });
                }

            }).catch(err=>{
                console.log(err);
            });
        }
    }

    return (
        <Card style={{padding:"45px 100px", textAlign:"center"}}>
            <Typography variant="h5" style={{marginBottom:35}}>Change Password</Typography>
            {
            personalData.map((element,index)=>{
                return(
                    <span style={styles.dataSpan} key={index+10}>
                        <TextField type="password" size="small" variant="standard" value={formValues[textData[index]]}
                        style={{width:"100%"}}
                        
                        label={element} onChange={(e) => {setFormValues({...formValues, [textData[index]]: e.target.value});}}
                        >
                            
                        </TextField>
                    </span>
                    );
                })
            }
            <Typography style={{color:"red"}}>{errorState===-1 ? "" : errors[errorState]}</Typography>
            <span style={{display:"flex", justifyContent:"center"}}>
                <Button style={styles.buttonStyle} onClick={handleSubmit}>
                    Submit Changes
                </Button>
            </span>
        </Card>
    );
}


export default SettingsScreen;
