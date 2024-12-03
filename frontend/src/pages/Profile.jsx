import React, { useContext } from "react";
import {
    Container,
    Paper,
    Avatar,
    Typography,
    Divider,
    Button,
    Box,
} from "@mui/material";

import { AppContext } from "../context/AppContext";

export default function ProfilePage() {
    const appContext = useContext(AppContext)

    console.log(appContext.state)
    // Example data matching your User schema
    const userData = {
        username: "joshua123",
        email: "joshtipon921@gmail.com",
        name: {
            first: "Joshua",
            last: "Tipon",
        },
        contactNumber: "09123456789",
        createdAt: "2024-08-14T10:36:00.000Z",
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Typography variant="h5" fontWeight="bold">
                        {`${appContext.state.profile.first} ${appContext.state.profile.last}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Username: {appContext.state.profile.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Email: {appContext.state.profile.email}
                    </Typography>
                    {appContext.state.profile.contactNumber && (
                        <Typography variant="body2" color="text.secondary">
                            Contact: {appContext.state.profile.contactNumber}
                        </Typography>
                    )}
                    {/* <Typography variant="body2" color="text.secondary">
                        Member since: {new Date(userData.createdAt).toLocaleDateString()}
                    </Typography> */}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Account Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your account is secure and connected with the email provided.
                </Typography>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={appContext.resetState} variant="outlined" color="error">
                        Logout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}