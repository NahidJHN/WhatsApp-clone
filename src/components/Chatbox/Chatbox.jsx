import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack, TextField, Button, Box, FormControl, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SendIcon from "@mui/icons-material/Send"
import { makeStyles } from "@mui/styles"
import { useParams } from "react-router-dom"
import { collection, onSnapshot, doc, query, orderBy, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import db from "../../firebase"
import { useStateValue } from '../../stateProvider/stateProvider';
import Messages from './Messages';
import { v4 as uuid } from "uuid"

const useStyle = makeStyles({
    chatBgImage: {
        backgroundImage: "url(https://cdn.wallpapersafari.com/27/32/jt4AoG.jpg)"
    },
    hideScroll: {
        scrollbarWidth: "none"
    }

})


const Chatbox = () => {
    const [{ user }, dispatch] = useStateValue()
    const { chatBgImage, hideScroll } = useStyle()
    const [roomUser, setRoomUser] = useState("")
    const [messages, setMessages] = useState([])
    const { roomId } = useParams()
    const scrollElement = useRef()
    const inputElem = useRef("")



    const scrollToBottom = () => {
        scrollElement.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [])

    useEffect(() => {
        if (roomId) {
            const querySnapshot = doc(db, "rooms", roomId)
            onSnapshot(querySnapshot, (snapshot) => {
                setRoomUser(snapshot.data().name)
            })

            const q = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp", "asc"))
            onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map(doc => doc.data()))

            })
            scrollToBottom()
        }


    }, [roomId])

    const hundleSubmit = async (event) => {
        event.preventDefault()
        const data = inputElem.current.value
        if (roomId) {
            const q = query(collection(db, "rooms", roomId, "messages"));

            if (data) {
                try {
                    await addDoc(q, {
                        name: user.displayName,
                        message: data,
                        timestamp: serverTimestamp()
                    })
                    scrollToBottom()
                    inputElem.current.value = ""

                } catch (error) {
                    console.log(error)
                }
            } else {
                alert("Please write a message")
            }


        }
    }


    return (
        <>
            <Grid container>
                <Grid item xs={6} md={4} sx={{ backgroundColor: "#128C7E", borderRight: "1px solid red", padding: "0px 5px", }}>
                    <Sidebar ID={roomId} />
                </Grid>
                <Grid item xs={6} md={8}> <List sx={{ bgcolor: '#128C7E', color: "#fff" }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={roomUser} secondary={new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()} sx={{ "& p": { color: "#ddd" } }} />
                    </ListItem>
                </List>

                    <Box className={chatBgImage} sx={{ display: "flex", flexDirection: "column", height: "83vh", }}>
                        <Stack className={hideScroll} sx={{ flex: 0.9, overflowY: "auto" }}>

                            {
                                messages.map(message => <Messages key={uuid()} message={message} />)

                            }
                            <div ref={scrollElement}></div>
                        </Stack>

                        <FormControl sx={{ px: 3, display: "flex", flexDirection: "row", flex: 0.1, }}>
                            <form action="#" onSubmit={hundleSubmit}>
                                <TextField
                                    inputRef={inputElem}
                                    name="message"
                                    size='small'
                                    type="text"
                                    placeholder="Write message"
                                    sx={{ width: "40rem" }}
                                    onFocus={(event) => event.target.style.backgroundColor = "white"}

                                />
                                <Button
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    variant="contained"
                                    sx={{ maxWidth: "100px", height: "40px", ml: 1, bgcolor: "#128C7E" }}
                                >send</Button>
                            </form>

                        </FormControl>


                    </Box>

                </Grid >

            </Grid>


        </>
    );
};




export default Chatbox;
