import React, { useState } from 'react';
import { Container, TextField, Card, Typography, Button, Paper} from "@mui/material";
import theme from "../theme";
import image from "../img/hacettepe_background.jpg";
import {register} from "../actions/users";
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    let navigate = useNavigate();

    const [inputState, setInputState] = useState({email:"", name:"sds", password: "dssd"});
    const [errorState, setErrorState] = useState(0);

    const fields = ["email", "name", "password"];

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
            setErrorState(1);
        }
        else{
            register(inputState)
            .then((res)=>{
                if(res.data.userId){
                    alert("success");
                    navigate("/");
                }
                else{
                    console.log("errorstate2");
                    setErrorState(2);
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
        
    }

    const navigateLogin = () => {
        navigate('/');
    }

    return (
        <Paper style={styles.container}>
            <Card style={styles.card}>
                <Typography variant="h4"> Sign Up</Typography>
                <Container style={{margin:"35px 0px", display:"flex", flexDirection:"column", width:"17em"}}>
                    <TextField id="mailField" helperText={errorState===1 ? "Email is not valid!" : ""} 
                    style={styles.field} variant="standard" size="small" label="Email" onChange={(e) => {handleChange(e,0)}}></TextField>
                    <TextField style={styles.field} variant="standard" size="small" label="Name" onChange={(e) => {handleChange(e,1)}}></TextField>
                    <TextField style={styles.field} variant="standard" size="small" label="Password" type="password" onChange={(e) => {handleChange(e,2)}}></TextField>
                    <Typography style={{color:"red", fontSize:"1em", marginTop:3}} >{errorState===2 ? "Email already in use!" : ""}</Typography>
                </Container>
                <Container style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
                    <Button onClick={navigateLogin} style={{fontSize:"0.75em", width:"12em", height:"1.7em"}}>Have an account?</Button>
                </Container>
                <Button style={styles.signButton} onClick={handleSubmit}>Sign Up</Button>
            </Card>
        </Paper>
    );
}
    

export default RegisterScreen;
