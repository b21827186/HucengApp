import { Card, Typography, Button, Paper, Avatar, Container} from "@mui/material";
import { fetchAllUsers } from "../actions/users";
import { useState, useMemo } from "react";
import {updateRole} from "../actions/users";
import myExcelXML from "./ExcelDownloader";
import theme from "../theme";
import { ContextValue } from "../context/Context";


const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [changes, setChanges] = useState(0);
    const [state, dispatch] = ContextValue();

    const getUsers = () => {
        fetchAllUsers(dispatch)
    }

    const getAllUsers = useMemo(getUsers, [changes]);

    const handleClick = (userId, givenRole) => {
        updateRole({userId:userId,newRole: givenRole}).then(res=>{
            alert("success");
            setChanges(changes+1);
        }).catch(err=>{
            console.log(err);
        })
    }

    const downloadExcel = () => {
        var myTestXML = new myExcelXML(JSON.stringify(users));
        myTestXML.downLoad();
    }

    const styles = {
        paperStyle: {
            backgroundColor: "#6722c7",
            padding: "100px 200px"
        },
        cardStyle: {
            marginBottom: 15,
            padding: "10px 20px",
            display: "flex",
            flexDirection: "row",
            alignItems:"center"
        },
        avatarStyle:{
            height: 70,
            width: 70,
            marginRight: 20
        },
        buttonStyle: {
            backgroundColor: "#6722c7",
            color:"white",
            marginRight: 8,
            padding: "10px 10px"
        },
        downloadStyle: {
            backgroundColor: theme.nativeRed,
            color: "white",
            padding: 15,
            marginTop: 30

        }
    }
    //fetch all users, dispaly id name mail role, add a button
    return (
        <Paper style={styles.paperStyle} >
            {
                state.allUsers.map((user,index) =>{
                    return <Card key={index} style={styles.cardStyle}>  
                    <Avatar src={user.image} style={styles.avatarStyle}></Avatar>
                    <Container>
                    <Typography variant="h5"> {user.name} - {user.role} </Typography>
                    </Container>
                    <Container style={{display:"flex", justifyContent:"end"}}>
                    <Button style={styles.buttonStyle} onClick={()=>{handleClick(user.id, "Representative")}}>Representative</Button>
                    <Button style={styles.buttonStyle} onClick={()=>{handleClick(user.id, "Graduate")}}>Graduate</Button>
                    <Button style={styles.buttonStyle} onClick={()=>{handleClick(user.id, "Academician")}}>Academician</Button>
                    <Button style={styles.buttonStyle} onClick={()=>{handleClick(user.id, "Student")}}>Student</Button>
                    </Container>
                    </Card>
                } )
            }
            <Container style={{display:"flex", justifyContent:"center"}}>
            <Button onClick={downloadExcel} style={styles.downloadStyle}>Download All</Button>
            </Container>
        </Paper>
    )
}

export default AdminPanel;
