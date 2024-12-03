import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Collapse,
    Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function ReportsTable() {
    const location = useLocation();
    const { participants = [] } = location.state || [];
    const [openRows, setOpenRows] = useState({});
    const [reportData, setReportData] = useState([]);

    const toggleRow = (index) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleGetParticipants = async (ids) => {
        try {
            const body = {
                "_id": {
                    "$in": ids
                }
            };

            const response = await axios.post('http://localhost:3001/api/search/Guest', body);
            console.log('Guests Response: ', response.data);
            const results = response.data.result;
            if (results.length > 0) {
                console.log("Participants: ", results);
                setReportData(results);
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

    useEffect(() => {
        handleGetParticipants(participants);
    }, [participants]);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Participant
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Tickets
                                </Typography>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((participant, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleRow(index)}
                                            >
                                                {openRows[index] ? (
                                                    <KeyboardArrowUp />
                                                ) : (
                                                    <KeyboardArrowDown />
                                                )}
                                            </IconButton>
                                            <Box ml={1}>
                                                <Typography fontWeight="bold">
                                                    {participant.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {participant.email}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {participant.id}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{participant.details ? 1 : 0}</Typography>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={3}
                                    >
                                        <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                                            <Box margin={2}>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Purchase Date:</strong>{" "}
                                                    {participant.details.purchaseDate}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Cost:</strong> {participant.details.cost}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    <strong>Participant Type:</strong>{" "}
                                                    {participant.details.participantType}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color={
                                                        participant.details.attendance
                                                            ? "green"
                                                            : "red"
                                                    }
                                                >
                                                    <strong>Attendance:</strong>{" "}
                                                    {participant.details.attendance
                                                        ? "True"
                                                        : "False"}
                                                </Typography>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}