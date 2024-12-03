import React, { useContext, useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import EventTable from '../tables/eventTable';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function UserDashBoard() {
    const appContext = useContext(AppContext);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = appContext?.state?.profile?._id;
    const token = appContext?.state?.token;

    useEffect(() => {
        if (userId && token) {
            const fetchEvents = async () => {
                try {
                    const response = await axios.post(
                        'http://127.0.0.1:3001/api/search/userDashboard/Event/',
                        { userId },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                        }
                    );
                    setEvents(response.data.result || []);
                } catch (error) {
                    console.error("Error fetching events:", error);
                    setError("Failed to fetch events. Please try again later.");
                }
            };
            fetchEvents();
        }
    }, [userId, token]);

    const handleCreate = () => {
        navigate('/create-event');
    };

    return (
        <>
            <Typography variant="h5" style={{ paddingTop: '10px' }}>
                Your Events
            </Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : events.length > 0 ? (
                <EventTable eventData={events} />
            ) : (
                <Typography>No events available for your account.</Typography>
            )}
            <Fab
                onClick={handleCreate}
                style={{ position: 'fixed', bottom: '16px', right: '16px' }}
                color="primary"
            >
                <AddIcon />
            </Fab>
        </>
    );
}