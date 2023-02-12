import { Grid, Container } from '@mui/material';
import SideProfileBar from "./SideProfileBar";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import PostsScreen from "./PostsScreen";
import PostDetails from "./PostDetails";
import EditScreen from './EditScreen';
import SettingsScreen from './SettingsScreen';
import NewPostScreen from './NewPostScreen';
import {ContextValue} from "../context/Context";
import MyAppBar from "./MyAppBar";
import EventScheduleBar from "./EventScheduleBar";
import types from '../actions/types';

const MainPage = () => {
    const [state, dispatch] = ContextValue();
    var middleScreen;

    
    if(state.screenNum===-1){
        setTimeout(()=>{
            dispatch({
                type:types.CHANGE_SCREEN,
                payload: 0
            })
        }, 5000);
    }

    const styles = {
        gridContainer:{
          paddingTop:105,
        },
        gridLeft:{
    
        },
        gridMiddle:{
          borderLeft:"solid grey 0.5px",
          borderRight: "solid grey 0.5px",
          padding:"0px 80px",
        },
        gridRight:{
          marginLeft:50,
        }
    }
    if(state.screenNum===0){
        middleScreen = <PostsScreen/>
    }
    else if(state.screenNum===1){
        middleScreen = <PostDetails/>
    }
    else if(state.screenNum===2){
        middleScreen = <SearchScreen/>
    }
    else if(state.screenNum===3){
        middleScreen = <ProfileScreen/>
    }
    else if(state.screenNum===4){
        middleScreen = <EditScreen/>
    }
    else if(state.screenNum===5){
        middleScreen = <SettingsScreen/>
    }
    else if(state.screenNum===6){
        middleScreen = <NewPostScreen/>
    }
    else if(state.screenNum===-1){
        middleScreen = <Container/>
    }
    
    return(
        <>
        <MyAppBar/>
        <Grid container style={styles.gridContainer}>
            <Grid item md={3.5} style={{}}>
                <SideProfileBar/>
            </Grid>
            <Grid item md={5} style={styles.gridMiddle}>
                {middleScreen}
            </Grid>
            <Grid item md={3} style={styles.gridRight}>
                <EventScheduleBar/>
            </Grid>
        </Grid>
        </>
    );
}

export default MainPage;
