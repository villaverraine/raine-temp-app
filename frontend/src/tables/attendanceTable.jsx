import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

export default function AttendanceTable({ attendanceData = [] }) {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.map((participant, index) => (
                            <TableRow
                                key={index}
                                style={{
                                    backgroundColor: participant.attendance
                                        ? participant.attendance === "True"
                                            ? "#d4f5d0" 
                                            : "#f5d0d0" 
                                        : "white",
                                }}
                            >
                                <TableCell>
                                    <Box display="flex" flexDirection="column">
                                        <Typography fontWeight="bold">
                                            {index + 1 < 10 ? `00${index + 1}` : `0${index + 1}`}{" "}
                                            {participant.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {participant.email}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {participant.id}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {participant.attendance === "True" ? (
                                        <CheckCircle style={{ color: "green" }} />
                                    ) : (
                                        <Cancel style={{ color: "red" }} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="text" style={{ marginRight: "16px" }}>
                    &lt;&lt; Previous
                </Button>
                <Typography variant="body2">View More</Typography>
                <Button variant="text" style={{ marginLeft: "16px" }}>
                    Next &gt;&gt;
                </Button>
            </Box>
        </>
    );
}