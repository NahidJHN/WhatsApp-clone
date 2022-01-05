import Login from "./components/Authentication/Login";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import Chatbox from "./components/Chatbox/Chatbox";
import PrivateRoute from "./components/Authentication/PriveteRoute";

const App = () => {

  const darkTheme = createTheme({
    palette: {
      mode: "light"
    }
  })

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box component="main" sx={{ boxShadow: "1px -5px 30px 1px #ebebeb", width: "80vw", height: "95vh", margin: "auto", marginTop: "1rem", }}>
          <Routes>
            <Route path="/" element={<Navigate to="/sign-up" />} />
            <Route path="sign-up" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/chat" element={<Chatbox />} />
              <Route path="/chat/:roomId" element={<Chatbox />} />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>

    </>
  );
}




export default App;
