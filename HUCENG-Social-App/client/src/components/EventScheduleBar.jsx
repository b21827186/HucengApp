import {ContextValue} from '../context/Context';
import { Card, Typography, Avatar, Container, CardMedia, CardActionArea, Box } from "@mui/material";
import EventNoteIcon from '@mui/icons-material/EventNote';

const EventScheduleBar = () => {
    const [state, dispatch] = ContextValue();

    const handleEventClick = (eventLink) => {
        window.open(eventLink, '_blank');
    }
    return (
        <Card style={{marginRight:30, position:"sticky", top:100}}>
            <Container style={{display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid red"}}>
                <EventNoteIcon style={{paddingTop:5, fontSize:40}} />
                <Typography variant="h5" style={{marginLeft:10}}>
                    Upcoming Events
                </Typography>
            </Container>
            <Container style={{marginTop:20, marginBottom:20}}>
                {
                    state.posts.map((element,index)=>{
                        return (element.type==="Event" ? 
                        <CardActionArea style={{marginBottom:10,padding:"0px 10px"}} key={index} onClick={()=>{handleEventClick(element.eventLink)}}>
                            <Typography style={{fontSize:20}}>
                                {element.content.substring(0,23)}...
                            </Typography>
                            <Typography style={{fontSize:15}}>
                                Event Date: {element.eventDate}
                            </Typography>
                        </CardActionArea>
                        : ""
                        )
                    })
                }
            </Container>
        </Card>
    )
}

export default EventScheduleBar;