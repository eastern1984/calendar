import { Typography, Stack, Button } from '@mui/material'
import { useState } from 'react'
import DayEvent from '../components/publicPages/DayEvent/DayEvent';

export default function Home() {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <DayEvent />
        </>
    )
}
