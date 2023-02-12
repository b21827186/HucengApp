import React, { useState } from 'react';
import { Container, TextField, Card, Typography, Button, Paper} from "@mui/material";
import theme from "../theme";
import image from "../img/hacettepe_background.jpg";
import {login, fetchSingleUser} from "../actions/users";
import { useNavigate } from "react-router-dom";
import { ContextValue } from '../context/Context';
import types from "../actions/types";
import { purple } from '@material-ui/core/colors';

const AdminLogin = () => {
    let navigate = useNavigate();
    const [state, dispatch] = ContextValue();
    const [inputState, setInputState] = useState({email:"", password: "dssd"});
    const [errorState, setErrorState] = useState(false);

    const fields = ["email", "password"];

    const handleChange = (e, index) => {
        setInputState({...inputState, [fields[index]]:e.target.value});
    }

    const styles = {
        container:{
            display:"flex", justifyContent:"center", alignItems:"center", height:"47.1em", width:"100%",
            backgroundColor: "#6722c7"
            
        },
        card:{
            padding:"55px 35px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
        },
        signButton:{
            backgroundColor: "#6722c7",
            color:"white",
            fontSize:"15px",
            padding:"5px 15px",
            marginTop:5,
            width:"13em",
        },
        field:{
            marginBottom:8
        }
    }

    const handleSubmit = () => {
        
        login(inputState).then((res)=>{
            if(res.data.userId){
                fetchSingleUser(res.data.userId, dispatch)
                .then(res=>{
                    navigate("/admin/panel");
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else{
                setErrorState(true);
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
        
    }


    return (
        <Paper style={styles.container}>
            <Card style={styles.card}>
                <Typography variant="h4"> Admin Panel</Typography>
                <Container style={{margin:"35px 0px", display:"flex", flexDirection:"column", width:"17em"}}>
                    <TextField id="mailField" 
                    style={styles.field} variant="standard" size="small" label="Email" onChange={(e) => {handleChange(e,0)}}></TextField>
                    <TextField style={styles.field} variant="standard" size="small" label="Password" type="password" onChange={(e) => {handleChange(e,1)}}></TextField>
                    <Typography style={{color:"red", fontSize:"1em",marginTop:3}}>{errorState ? "Email or password is incorrect!" : ""}</Typography>
                </Container>

                <Button style={styles.signButton} onClick={handleSubmit}>Sign In</Button>
            </Card>
            
        </Paper>
    );
}
    

export default AdminLogin;
