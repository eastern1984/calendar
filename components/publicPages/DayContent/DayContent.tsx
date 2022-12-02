import { Typography, Stack, Button } from '@mui/material'
import { useState } from 'react'
import { IDayEvent } from '../../../models/DayEvent';
import Dialog from './Dialog';
import DayContentTable from './DayContentTable';
import { IDayContent } from '../../../models/DayContent';

export default function DayContent() {
    const [showDialog, setShowDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState<IDayContent | null>(null);

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant='h3'>Таблица для ручного редактирования дня</Typography>
                <Button variant='contained' onClick={() => { setShowDialog(true); setCurrentItem(null) }}>Создать</Button>
            </Stack>
            <DayContentTable setCurrentItem={(item) => { setCurrentItem(item); setShowDialog(true) }} />
            <Dialog open={showDialog} onClose={() => { setShowDialog(false) }} dayContent={currentItem} />
        </Stack>
    )
}
