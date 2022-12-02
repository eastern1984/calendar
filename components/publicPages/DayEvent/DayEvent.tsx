import { Typography, Stack, Button } from '@mui/material'
import { useState } from 'react'
import { IDayEvent } from '../../../models/DayEvent';
import Dialog from './Dialog';
import DayEventsTable from './DayEventsTable';

export default function DayEvent() {
    const [showDialog, setShowDialog] = useState(false);
    const [dayEvent, setDayEvent] = useState<IDayEvent | null>(null);

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant='h3'>Таблица святых</Typography>
                <Button variant='contained' onClick={() => setShowDialog(true)}>Создать</Button>
            </Stack>
            <DayEventsTable />
            <Dialog open={showDialog} onClose={() => { setShowDialog(false) }} dayEvent={dayEvent} />
        </Stack>
    )
}
