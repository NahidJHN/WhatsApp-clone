import { Typography } from '@mui/material';
import React from 'react';
import { useStateValue } from '../../stateProvider/stateProvider';

const Messages = ({ message }) => {

    const [{ user }, ] = useStateValue()

    return (
        <Typography component="div" sx={{ display: "flex", flexDirection: "column", alignItems: `${message.name === user.displayName ? "end" : "start"}`, p: 2, }}>
            <div style={{ backgroundColor: `${message.name === user.displayName ? "#dcf8c6" : "#bccab1"}`, width: "content-fit", padding: "10px", borderRadius: "10px", maxWidth: "80%", borderBottomLeftRadius: "0" }}>
                <strong style={{ fontSize: "12px" }}>{message.name}</strong>

                <p style={{ lineHeight: 1, margin: 0 }}>
                    {message.message}
                </p>
                <span style={{ fontSize: "10px" }} > {new Date(message.timestamp?.toDate()).toUTCString()} </span>
            </div>
        </Typography>
    )
};

export default Messages;