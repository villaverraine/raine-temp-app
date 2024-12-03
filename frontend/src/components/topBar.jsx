import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function TopBar() {
    return (
        <AppBar
            position="static"
            elevation={0}
            style={{
                backgroundColor: "transparent",
                borderTop: "2px solid #000",
                borderBottom: "2px solid #000",
                color: "black",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Acacia Waldorf School
                </Typography>
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;


// const {React} = require("react"); 
// const { AppBar, Toolbar, IconButton, Typography } = require("@mui/material");
// const {MenuIcon} = require("@mui/icons-material/Menu");
// const {NotificationsIcon} = require("@mui/icons-material/Notifications");
// const {AccountCircleIcon} =  require("@mui/icons-material/AccountCircle");

// function TopBar() {
//     return (
//         <AppBar position='static' elevation={0} style={{ backgroundColor: 'transparent', borderTop: "2px solid #000", borderBottom: "2px solid #000", color: 'black', width: '100%', boxSizing: "border-box" }}>
//             <Toolbar style={{display: 'flex', justifyContent: "space-between"}}>
//                 <IconButton>
//                     <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Acacia Waldorf School</Typography>
//                 <IconButton>
//                     <NotificationsIcon />
//                 </IconButton>
//                 <IconButton>
//                     <AccountCircleIcon />
//                 </IconButton>
//             </Toolbar>
//         </AppBar>
//     );
// }