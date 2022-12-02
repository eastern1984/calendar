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
    date: moment().unix()
};

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent | null
}

const DayContentDialog: React.FC<IProps> = ({ open, onClose, dayContent }) => {
    const { mutate: create, isLoading } = useCreateDayContentMutation();
    const { mutate: update, isLoading: isUpdating } = useUpdateDayContentMutation();
    const [data, setData] = useState<IDayContent>(dayContent ? { ...dayContent } : { ...INIT_DATA });

    const addItemToEvents = (lang: string) => {
        setData({ ...data, content: data.content.map(v => (v.lang === lang) ? { ...v, events: [...v.events, { ...EMPTY_EVENT }] } : v) });
    }
    const setType = (i: number, lang: string, value: number | string, type: "CATEGORY" | "SERVICE_TYPE" | "SAINT_TYPE" | "TITLE" | "YEAR") => {
        setData({
            ...data,
            content: data.content.map(v => {
                if (v.lang === lang) {
                    const events = v.events;
                    switch (type) {
                        case "CATEGORY": events[i].category = value as number; break;
                        case "SERVICE_TYPE": events[i].serviceType = value as number; break;
                        case "SAINT_TYPE": events[i].saintType = value as number; break;
                        case "TITLE": events[i].title = value as string; break;
                        case "YEAR": events[i].year = value as string; break;
                    }
                    return { ...v, events: [...events] };
                }
                return v;
            })
        });
    }

    const deleteEvent = (i: number, lang: string) => {
        setData({ ...data, content: data.content.map(v => (v.lang === lang) ? { ...v, events: [...v.events.filter((v, index) => index !== i)] } : v) });
    }

    const onItemShift = (i: number, lang: string, up: boolean) => {
        setData({
            ...data,
            content: data.content.map(v => {
                if (v.lang === lang) {
                    const item = { ...v.events[up ? i - 1 : i + 1] };
                    if (up) {
                        v.events[i - 1] = { ...v.events[i] };
                    } else {
                        v.events[i + 1] = { ...v.events[i] };
                    }
                    v.events[i] = { ...item };
                    return { ...v, events: [...v.events] }
                }
                return v;
            })
        });
    }

    useEffect(() => {
        if (dayContent) {
            setData({ ...dayContent })
        }
    }, [dayContent])
    console.log(data._id);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Box component="form">
                <DialogTitle>Ручное редактирование каледарного дня</DialogTitle>
                <DialogContent>

                    <Stack spacing={1} alignItems="flex-start">
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                            <Typography variant='h4'>День:</Typography>
                            <Box sx={{ width: "200px" }}>
                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    value={moment.unix(data.date) || moment()}
                                    onChange={(v: Moment | null) => setData({ ...data, date: (v?.unix() || 0) })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Stack>

                        {data.content.map((v: IContent, index) => (
                            <Stack spacing={1} minWidth={"100%"} key={v.lang}>
                                <Typography variant='h4'>Описание дня {v.lang.toUpperCase()}</Typography>
                                {v.events.map((event, index) => (
                                    <Stack direction={"row"} spacing={1} key={index}>
                                        <FormControl sx={{ minWidth: "100px" }} >
                                            <InputLabel>Категория</InputLabel>
                                            <Select value={event.category} label="Категория" name="category" onChange={(e) => setType(index, v.lang, e.target.value as number, "CATEGORY")} >
                                                {CATEGORY.map((v, index) => (
                                                    <MenuItem key={v} value={index}>{v}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: "100px" }}>
                                            <InputLabel>Служба</InputLabel>
                                            <Select value={event.serviceType} label="Служба" name="serviceType" onChange={(e) => setType(index, v.lang, e.target.value as number, "SERVICE_TYPE")}>
                                                {SERVICE_TYPE.map((v, index) => (
                                                    <MenuItem key={v} value={index}>{v}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ minWidth: "100px" }}>
                                            <InputLabel>Ранг</InputLabel>
                                            <Select value={event.saintType} label="Ранг" name="saintType" onChange={(e) => setType(index, v.lang, e.target.value as number, "SAINT_TYPE")}                        >
                                                {SAINT_TYPE.map((v, index) => (
                                                    <MenuItem key={v} value={index}>{v}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Описание"
                                            onChange={(e) => setType(index, v.lang, e.target.value, "TITLE")}
                                            value={event.title}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Год"
                                            onChange={(e) => setType(index, v.lang, e.target.value, "YEAR")}
                                            value={event.year}
                                            sx={{ minWidth: "80px" }}
                                        />
                                        <Button variant='outlined' color='secondary' disabled={index === 0} onClick={() => { onItemShift(index, v.lang, true) }}><KeyboardArrowUpIcon /></Button>
                                        <Button variant='outlined' disabled={index === v.events.length - 1} onClick={() => { onItemShift(index, v.lang, false) }}><KeyboardArrowDownIcon /></Button>
                                        <Button variant='contained' color="error" onClick={() => { deleteEvent(index, v.lang) }}><DeleteIcon /></Button>
                                    </Stack>
                                ))}

                                <Stack alignItems={"flex-end"} pt={2}>
                                    <Button variant='contained' sx={{ width: "200px" }} onClick={() => addItemToEvents(v.lang)}>Добавить событие</Button>
                                </Stack>
                            </Stack>
                        ))}
                        <Typography variant='h4'>Предпросмотр</Typography>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Отмена</Button>
                    <Button variant='contained' onClick={() => { data._id ? update({ body: { ...data } }) : create({ body: { ...data } }) }}>Создать</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default DayContentDialog;

