import React, { useState } from 'react';
import { Container, TextField, Card, Typography, Button, Paper} from "@mui/material";
import theme from "../theme";
import image from "../img/hacettepe_background.jpg";
import {login, fetchSingleUser} from "../actions/users";
import { useNavigate } from "react-router-dom";
import { ContextValue } from '../context/Context';
import types from "../actions/types";

const LoginScreen = () => {
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
            backgroundImage: `url(${image})`, backgroundSize: "cover",
            
        },
        card:{
            padding:"55px 35px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
        },
        signButton:{
            backgroundColor: theme.nativeRed,
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
        if(inputState.email.split("@")[1] !== "cs.hacettepe.edu.tr"){
            setErrorState(true);
        }
        else{
            login(inputState).then((res)=>{
                if(res.data.userId){
                    fetchSingleUser(res.data.userId, dispatch)
                    .then(res=>{
                        localStorage.setItem("user", JSON.stringify(res.data));
                        dispatch({
                            type: types.FETCH_SINGLE_USER,
                            payload: res.data
                        });
                        navigate("/feed");
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
    }

    const navigateRegister = () => {
        navigate('/register');
    }

    return (
        <Paper style={styles.container}>
            <Card style={styles.card}>
                <Typography variant="h4"> Sign In</Typography>
                <Container style={{margin:"35px 0px", display:"flex", flexDirection:"column", width:"17em"}}>
                    <TextField id="mailField" 
                    style={styles.field} variant="standard" size="small" label="Email" onChange={(e) => {handleChange(e,0)}}></TextField>
                    <TextField style={styles.field} variant="standard" size="small" label="Password" type="password" onChange={(e) => {handleChange(e,1)}}></TextField>
                    <Typography style={{color:"red", fontSize:"1em",marginTop:3}}>{errorState ? "Email or password is incorrect!" : ""}</Typography>
                </Container>
                <Container style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
                    <Button onClick={navigateRegister} style={{fontSize:"0.75em", width:"14em", height:"1.7em"}}>Don't have account?</Button>
                </Container>
                <Button style={styles.signButton} onClick={handleSubmit}>Sign In</Button>
            </Card>
            
        </Paper>
    );
}
    

export default LoginScreen;
