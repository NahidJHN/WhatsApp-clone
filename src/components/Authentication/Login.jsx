import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Google, Facebook } from '@mui/icons-material';
import { gAuth, GetAuth } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from "../../stateProvider/stateProvider"
import { actionType } from "../../stateProvider/reducer"
import { useLocation, useNavigate } from 'react-router-dom';



export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };


    const [{ user }, dispatch] = useStateValue()
    const location = useLocation()
    const navigate = useNavigate()

    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(GetAuth, gAuth)
            dispatch({
                type: actionType.SET_USER,
                user: result.user
            })
            if (location?.state?.from) {
                navigate(location.state.from)
            }
            navigate("/chat")
        } catch (error) {
            console.log(error.message)
        }


    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center", height: "500px" }}>
                            <Button
                                sx={{ p: 3, }}
                                onClick={handleGoogleAuth}
                                variant='outlined'
                                color="primary"
                                startIcon={<Google sx={{ color: "red", fontSize: "60px" }} />}
                            >
                                Sign In with Google
                            </Button>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >

    )
}
