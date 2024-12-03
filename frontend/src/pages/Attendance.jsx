import {
    Typography
} from '@mui/material'

import AttendanceTable from '../tables/attendanceTable';


export default function Attendance(){

    const attendanceData = [
        {
            name: "Joshua Tipon",
            email: "joshtipon921@gmail.com",
            id: "12191639",
            attendance: "True", 
        },
        {
            name: "Joshua Tipon",
            email: "joshtipon921@gmail.com",
            id: "12191639",
            attendance: "True", 
        },
        {
            name: "Joshua Tipon",
            email: "joshtipon921@gmail.com",
            id: "12191639",
            attendance: "False", 
        },
    ];
    return (
        <>
            <Typography style={{ fontSize: '25px', paddingTop: '10px', marginLeft:'10px' }}>Attendance</Typography>
            <AttendanceTable attendanceData={attendanceData}/>
        </>
    );
}