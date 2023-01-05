import { Typography, Stack, Button, Link } from '@mui/material'
import { useState } from 'react'
import Dialog from './Dialog';
import DayContentTable from './DayContentTable';
import { IDayContent } from '../../../models/DayContent';
import ViewDialog from './ViewDialog';
import DeleteDialog from './DeleteDialog';
import { signIn, useSession } from "next-auth/react";

export default function DayContent() {
    const { data: session, status } = useSession();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState<IDayContent | null>(null);

    return (
        <>
            {!session && <Button
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}>
                Sign in
            </Button>
            }
            {session && <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant='h3'>Таблица для ручного редактирования дня</Typography>
                    <Button variant='contained' onClick={() => { setShowDialog(true); setCurrentItem(null) }}>Создать</Button>
                </Stack>
                <DayContentTable
                    onUpdate={(item) => { setCurrentItem(item); setShowDialog(true) }}
                    onView={(item) => { setCurrentItem(item); setShowViewDialog(true) }}
                    onDelete={(item) => { setCurrentItem(item); setShowDeleteDialog(true) }}
                />
                {showDialog && <Dialog open={showDialog} onClose={() => { setShowDialog(false) }} dayContent={currentItem} />}
                {showViewDialog && currentItem && <ViewDialog open={showViewDialog} onClose={() => { setShowViewDialog(false) }} dayContent={currentItem} />}
                {showDeleteDialog && currentItem && <DeleteDialog open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} dayContent={currentItem} />}
            </Stack>
            }
        </>
    )
}
