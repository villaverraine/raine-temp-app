import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function TopBar() {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile')
    }
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
                <IconButton onClick={handleProfileClick}>
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
