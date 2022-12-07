import { IconButton, Divider, Box, Typography, Stack, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react';
import moment, { Moment, months } from 'moment';
import { CATEGORY, SAINT_TYPE, SERVICE_TYPE } from '../../../models/DayEvent';
import { IContent, IDayContent } from '../../../models/DayContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateDayContentMutation, useUpdateDayContentMutation } from '../../../requests/hooks/dayContentHooks';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import BackDrop from '../../common/BackDrop';
import { useGetDayQuery } from '../../../requests/hooks/calendarHooks';
import Month from '../Month/Month';

const EMPTY_EVENT = {
    category: 0,
    serviceType: 0,
    saintType: 0,
    title: "",
    year: "",
}

const INIT_DATA: IDayContent = {
    content: [
        { lang: "ru", description: "", readings: "", weekInfo: "", events: [{ ...EMPTY_EVENT },] },
        { lang: "en", description: "", readings: "", weekInfo: "", events: [{ ...EMPTY_EVENT }] }
    ],
    date: moment().format(DATE_CONTENT_FORMAT)
};

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent | null
}

const DayContentDialog: React.FC<IProps> = ({ open, onClose, dayContent }) => {
    const { mutate: create, isLoading, isSuccess } = useCreateDayContentMutation();
    const { mutate: update, isLoading: isUpdating, isSuccess: isUpdated } = useUpdateDayContentMutation();
    const [data, setData] = useState<IDayContent>(dayContent ? { ...dayContent } : { ...INIT_DATA });

    const currentDate = { year: data.date.split('-')[2], months: data.date.split('-')[0], day: data.date.split('-')[1] }
    const { data: oldData, isFetching } = useGetDayQuery(currentDate.year, currentDate.months, currentDate.day, !!data?.date);

    useEffect(() => {
        if (!data.content[0]?.events[0]?.title && !data.content[1]?.events[0]?.title && oldData && !isFetching) {
            setData({ ...oldData });
        }
    }, [oldData, isFetching]);

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
        //  if (dayContent) {
        setData(dayContent ? { ...dayContent } : INIT_DATA)
        //  }
    }, [dayContent])

    useEffect(() => {
        if (isUpdated || isSuccess) {
            setData(INIT_DATA);
            onClose();
        }
    }, [isUpdated, isSuccess])

    return (
        <Dialog open={open} onClose={() => { setData(INIT_DATA); onClose(); }} maxWidth="lg" fullWidth>
            <Box component="form">
                {(isLoading || isUpdating || isFetching) && <BackDrop />}
                <DialogTitle>Ручное редактирование каледарного дня</DialogTitle>
                <DialogContent>

                    <Stack spacing={1} alignItems="flex-start">
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                            <Typography variant='h4'>День:</Typography>
                            <Box sx={{ width: "200px" }}>
                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    value={data && data.date ? moment(data.date, DATE_CONTENT_FORMAT) : moment()}
                                    onChange={(v: Moment | null) => setData({ ...data, date: (v || moment()).format(DATE_CONTENT_FORMAT) })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Stack>

                        {data?.content.map((v: IContent, index) => (
                            <Stack spacing={1} minWidth={"100%"} key={v.lang}>
                                <Typography variant='h4'>Описание дня {v.lang.toUpperCase()}</Typography>
                                <TextField
                                    label="Описание седмицы"
                                    onChange={(e) => setData({ ...data, content: data.content.map(content => (content.lang === v.lang) ? { ...content, weekInfo: e.target.value } : content) })}
                                    value={v.weekInfo}
                                    fullWidth
                                />
                                <TextField
                                    label="Чтения"
                                    onChange={(e) => setData({ ...data, content: data.content.map(content => (content.lang === v.lang) ? { ...content, readings: e.target.value } : content) })}
                                    value={v.readings}
                                    fullWidth
                                />
                                <TextField
                                    label="Дополнительная информация"
                                    onChange={(e) => setData({ ...data, content: data.content.map(content => (content.lang === v.lang) ? { ...content, description: e.target.value } : content) })}
                                    value={v.description}
                                    fullWidth
                                />
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
                                                    <MenuItem key={v.name} value={index}>{v.name}</MenuItem>
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
                    <Button onClick={() => { setData(INIT_DATA); onClose(); }} color="secondary" variant='contained'>Отмена</Button>
                    <Button variant='contained' onClick={() => { data._id ? update({ body: { ...data } }) : create({ body: { ...data } }) }}>Создать</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default DayContentDialog;

