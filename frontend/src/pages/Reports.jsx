import {
    Typography
} from '@mui/material'

import ReportsTable from '../tables/reportsTable';

export default function ReportsForm() {
    const reportData = [
        {
            "name": "Joshua Tipon",
            "email": "joshtipon921@gmail.com",
            "id": "12191639",
            "details": {
                "purchaseDate": "08/14/2024 10:36",
                "cost": "500 Php",
                "participantType": "Guest",
                "attendance": true
            }
        },
        {
            "name": "Maria Santos",
            "email": "mariasantos@example.com",
            "id": "12191640",
            "details": {
                "purchaseDate": "08/15/2024 14:20",
                "cost": "600 Php",
                "participantType": "Regular",
                "attendance": false
            }
        },
        {
            "name": "John Cruz",
            "email": "johncruz@example.com",
            "id": "12191641",
            "details": {
                "purchaseDate": "08/16/2024 09:45",
                "cost": "700 Php",
                "participantType": "VIP",
                "attendance": true
            }
        },
        {
            "name": "Anna Reyes",
            "email": "annareyes@example.com",
            "id": "12191642",
            "details": {
                "purchaseDate": "08/17/2024 11:30",
                "cost": "550 Php",
                "participantType": "Guest",
                "attendance": true
            }
        }
    ]

    return (
        <>
            <Typography style={{ fontSize: '25px', paddingTop: '10px', marginLeft:'10px' }}>Reports</Typography>
            <ReportsTable reportData={reportData}/>
        </>
    );
}