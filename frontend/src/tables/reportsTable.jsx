import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
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
    const appContext = useContext(AppContext);
    const userId = appContext?.state?.profile?._id;
    const token = appContext?.state?.token;

    const [openRows, setOpenRows] = useState({});
    const [reportData, setReportData] = useState([]);

    const toggleRow = (index) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleGetParticipants = async (ids) => {
        try {
            if (ids.length > 0) {
                const body = {
                    "_id": {
                        "$in": ids
                    }
                };

                const response = await axios.post(
                    "http://localhost:3001/api/search/Guest",
                    body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
                );

                const results = response.data.result;
                if (results.length > 0) {
                    setReportData(results);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetParticipants(participants);
    }, [participants]);

    return (
        <>
            <TableContainer>
                {reportData.length > 0 ? (
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
                                                    {participant.name && (
                                                        <Typography fontWeight="bold">
                                                            {participant.name}
                                                        </Typography>
                                                    )}
                                                    {participant.email && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            {participant.email}
                                                        </Typography>
                                                    )}
                                                    {participant.id && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            {participant.id}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {participant.details ? 1 : 0}
                                            </Typography>
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{ paddingBottom: 0, paddingTop: 0 }}
                                            colSpan={3}
                                        >
                                            <Collapse
                                                in={openRows[index]}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box margin={2}>
                                                    {participant.date && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            <strong>Purchase Date:</strong>{" "}
                                                            {participant.date}
                                                        </Typography>
                                                    )}
                                                    {participant.cost && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            <strong>Cost:</strong>{" "}
                                                            {participant.cost}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="body2" color="textSecondary">
                                                        <strong>Participant Type:</strong>{" "}
                                                        {participant.participantType ? participant.participantType : 'Guest'}
                                                    </Typography>
                                                    {participant.attendance !== undefined && (
                                                        <Typography
                                                            variant="body2"
                                                            color={
                                                                participant.attendance
                                                                    ? "green"
                                                                    : "red"
                                                            }
                                                        >
                                                            <strong>Attendance:</strong>{" "}
                                                            {participant.attendance
                                                                ? "True"
                                                                : "False"}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Box textAlign="center" p={4}>
                        <Typography variant="h6" color="textSecondary">
                            No participants found.
                        </Typography>
                    </Box>
                )}
            </TableContainer>
        </>
    );
}
