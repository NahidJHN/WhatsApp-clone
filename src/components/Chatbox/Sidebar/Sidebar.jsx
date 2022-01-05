import React, { useEffect, useState } from 'react';
import { Avatar, Container, Divider, IconButton, Box, InputAdornment, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText, Fab, Snackbar, Alert } from '@mui/material';
import styled from "styled-components"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Add as AddIcon, Message, Search } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import db from "../../../firebase"
import { collection, query, onSnapshot, addDoc, orderBy } from "firebase/firestore"
import { Link } from "react-router-dom"
import { v4 as uuid } from "uuid"

const SideChat = ({ ID, room }) => {
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const q = query(collection(db, "rooms", ID, "messages"), orderBy("timestamp", "desc"))
        onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))

        })
    }, [ID])


    return (
        <Link style={{ textDecoration: "none", color: "inherit" }} key={room.id} to={`/chat/${room.id}`}>

            <ListItem sx={{ cursor: "pointer" }}>
                <ListItemAvatar>
                    <Avatar>

                    </Avatar>
                </ListItemAvatar>

                <ListItemText key={uuid()} primary={room.name} secondary={messages[0]?.message} sx={{ "& p": { fontWeight: "700" } }} />
            </ListItem>
        </Link>
    )

}




const Sidebar = () => {
    const [rooms, setRooms] = useState([])
    const [open, setOpen] = useState(false)


    useEffect(() => {
        const unsubscribe = () => {
            const querySnapshot = query(collection(db, "rooms"))
            onSnapshot(querySnapshot, (snapshot) => {
                const newRooms = [...rooms,]
                snapshot.forEach(doc => {
                    newRooms.push({
                        id: doc.id,
                        name: doc.data().name
                    })


                })
                setRooms(newRooms)
            })

            return () => {
                unsubscribe()
            }

        }
        unsubscribe()
    }, [])


    const createUserController = async () => {
        let userName = prompt("Whats Your Name")
        if (userName) {
            let q = collection(db, "rooms")
            try {
                await addDoc(q, {
                    name: userName
                })
                setOpen(true)
            } catch (error) {
                console.log(error)
            }

        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 3px", borderRadius: "7px" }}>
                <SideHeader>
                    <Avatar>
                        J
                    </Avatar>
                </SideHeader>
                <SideIconContainer>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <Message />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </SideIconContainer>
            </Container>

            <Box sx={{ p: 2 }}>
                <TextField placeholder="Search and start new chat"
                    fullWidth
                    sx={{ backgroundColor: "#fff" }}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}

                />
                <Typography variant='h4' color="#fff" textAlign="center" paddingTop={1}> Add new Chat

                    <Fab onClick={createUserController} color="primary" sx={{ ml: 3 }} area-aria-level="add">
                        <AddIcon />
                    </Fab>
                </Typography>
            </Box>

            <Divider />
            <Box>
                <List sx={{ mx: "auto", color: "#fff", overflowY: "auto", height: "65vh", backgroundColor: ":hover:black", "& :hover": { backgroundColor: "#02574D" } }}>
                    {rooms.map(room =>
                        <SideChat key={uuid()} room={room} ID={room.id} />
                    )}

                </List>

                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} security='success' sx={{ width: "100%" }} >
                        User Created Sucessful
                    </Alert>

                </Snackbar>
            </Box>

        </>
    )
};




const SideHeader = styled.div`
            display:flex;
            justify-content:space-around;
            `

const SideIconContainer = styled.div`
            display:flex
            `

export default Sidebar;