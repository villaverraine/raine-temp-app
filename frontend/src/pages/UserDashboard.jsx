import React, { useContext, useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EventTable from '../tables/eventTable';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { AppContext } from '../context/AppContext';

export default function UserDashBoard() {
    const appContext = useContext(AppContext);
    const [events, setEvents] = useState([]);
    const userId = appContext.state.profile._id;

    useEffect(() => {
        if (userId) {
            const fetchEvents = async () => {
                try {
                    const response = await axios.post(
                        'http://127.0.0.1:3001/api/search/userDashboard/Event/',
                        { userId },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: appContext.state.token,
                            },
                        }
                    );
                    setEvents(response.data.result);
                } catch (error) {
                    console.error("Error fetching events:", error);
                    setEvents([]);
                }
            };
            fetchEvents();
        }
    }, [userId]);

    const handleCreate = () => {
        console.log("Create Submitted");
    };

    return (
        <>
            <Typography style={{ fontSize: '25px', paddingTop: '10px' }}>Your Events</Typography>
            {events.length > 0 ? (
                <EventTable eventData={events} />
            ) : (
                <Typography>No events available for your account.</Typography>
            )}
            <Fab
                onClick={handleCreate}
                style={{ position: 'fixed', bottom: '16px', right: '16px' }}
            >
                <AddIcon />
            </Fab>
        </>
    );
}