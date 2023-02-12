import { Card, Typography, Avatar, Container, CardMedia, CardActionArea, Box, IconButton } from "@mui/material";
import types from '../actions/types';
import { ContextValue } from '../context/Context';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePostById } from "../actions/posts";

const Post = ({postDetails, userDetails}) => {
    const [state, dispatch] = ContextValue();
    
    const styles = {
        userContainer: {
            width:50, height:50, marginRight: 20, marginTop:10, marginBottom:10
        }
    }

    const prettyDate = (strDate)=>{
        let t = new Date(strDate);
        let date = ('0' + t.getDate()).slice(-2);
        let month = ('0' + (t.getMonth() + 1)).slice(-2);
        let year = t.getFullYear();
        let hours = ('0' + t.getHours()).slice(-2);
        let minutes = ('0' + t.getMinutes()).slice(-2);
        let time = `${hours}:${minutes} - ${date}/${month}/${year} `;
        return time;
    }
    const handleProfileClick=(postUser)=>{
        dispatch({
            type:types.CHANGE_SCREEN,
            payload: 3
        });
        dispatch({
            type:types.FETCH_SINGLE_USER,
            payload: userDetails
        });
        
    }

    const postDeleteClick = (postId) => {
        deletePostById(postId);
    }

    return (
        <Card style={{marginBottom:50}}>
            <Container style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Box style={{display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"start"}}>
                    <CardActionArea style={{display:"flex", paddingRight:20, paddingLeft:10}} onClick={()=>handleProfileClick(userDetails)}>
                        <Avatar src={userDetails.image} style={styles.userContainer}></Avatar>
                        <Typography>{userDetails.name} </Typography>
                    </CardActionArea>
                </Box>
                {prettyDate(postDetails.date)}
                {
                    postDetails.userId===JSON.parse(localStorage.getItem("user")).id ? <IconButton style={{padding:0, color:"black"}} onClick={()=>{postDeleteClick(postDetails.id)}}><DeleteIcon/></IconButton>  : ""
                }
            </Container>
            <CardActionArea>
                <Typography style={{borderTop:"1px solid grey", padding:"10px 10px"}}>
                    {postDetails.content}
                </Typography>
                <CardMedia style={{height:300}}
                image={postDetails.imageLink} alt={"dsadsa"}
                />
            </CardActionArea>
        </Card>
    );
}

export default Post;