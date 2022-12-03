import { IconButton, Divider, Box, Typography, Stack, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { CATEGORY, SAINT_TYPE, SERVICE_TYPE } from '../../../models/DayEvent';
import { IContent, IDayContent } from '../../../models/DayContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateDayContentMutation, useUpdateDayContentMutation } from '../../../requests/hooks/dayContentHooks';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';

const EMPTY_EVENT = {
    category: 0,
    serviceType: 0,
    saintType: 0,
    title: "",
    year: "",
}

const INIT_DATA: IDayContent = {
    content: [
        { lang: "ru", events: [{ ...EMPTY_EVENT },] },
        { lang: "en", events: [{ ...EMPTY_EVENT }] }
    ],
    date: moment().format(DATE_CONTENT_FORMAT)
};

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent | null
}

const ViewDialog: React.FC<IProps> = ({ open, dayContent, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Box>
                <DialogTitle>Просмотр дня</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Закрыть</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default ViewDialog;

