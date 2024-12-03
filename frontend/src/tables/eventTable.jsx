import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function EventTable({ eventData = [] }) {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const userId = appContext?.state?.profile?._id;
    const token = appContext?.state?.token;

    const [actionTable, setActionTable] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleOpenDialog = (event) => {
        setSelectedEvent(event);
        setActionTable(true);
    };

    const handleCloseDialog = () => {
        setActionTable(false);
        setSelectedEvent(null);
    };

    const handleViewReports = async (id) => {
        const body = {
            "_id": id
        };

        try {
            const response = await axios.post('http://localhost:3001/api/search/Event',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );

            console.log('Response: ', response.data);
            const results = response.data.result;
            if (results.length > 0) {
                const participants = results[0].participants;
                console.log('Participants: ', participants);
                navigate("/reports", { state: { participants } });
            }
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    const userActions = [
        {
            label: 'Edit Event',
            onClick: () => {
                alert(`Edit action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
        {
            label: 'Edit Data',
            onClick: () => {
                alert(`Edit Data action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
        {
            label: 'View Reports',
            onClick: () => {
                alert(`View Reports action for ${selectedEvent?.name}`);
                handleViewReports(selectedEvent?._id);
                handleCloseDialog();
            },
        },
        {
            label: 'Raffles',
            onClick: () => {
                alert(`Raffles action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
    ];


    const adminActions = [
        {
            label: 'Edit Data',
            onClick: () => {
                alert(`Edit action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
        {
            label: 'View Reports',
            onClick: () => {
                alert(`View Reports action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
        {
            label: 'Raffles',
            onClick: () => {
                alert(`Raffles action for ${selectedEvent?.name}`);
                handleCloseDialog();
            },
        },
    ]


    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1" fontWeight="bold">Event</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventData.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div style={{ fontWeight: 'bold' }}>{event.name}</div>
                                    <div>{`${event.date} at ${event.time}`}</div>
                                    <Button size="small" color="black">Show More ▼</Button>
                                </TableCell>
                                <TableCell>
                                    <div style={{ fontSize: '16px', fontWeight: 'bolder' }}>
                                        {event.status}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <MoreVertIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleOpenDialog(event)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Dialog open={actionTable} onClose={handleCloseDialog}>
                <DialogTitle>
                    {selectedEvent ? `Actions for ${selectedEvent.name}` : 'Actions'}
                </DialogTitle>
                <DialogActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, padding: 2 }}>
                    {userActions.map((button, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            color='#0000'
                            onClick={button.onClick}
                            sx={{ width: '50%', maxWidth: '300px', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', textTransform: 'none' }}
                        >
                            {button.label}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </>
    );
}