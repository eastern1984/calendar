import { Paper, Box, Typography, Stack, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField } from '@mui/material'
import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { IDayContent, INIT_DAY_CONTENT } from '../../../models/DayContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useCreateDayContentMutation, useGetDayContentQuery, useUpdateDayContentMutation } from '../../../requests/hooks/dayContentHooks';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import BackDrop from '../../common/BackDrop';
import InfoTable from './InfoTable';
import EventsTable from './EventsTable';
import DayView from '../Day/DayView';
import { dayContentsForDayView } from '../../../helpers/dayView';
import { IntlProvider } from 'react-intl';
import { messages } from '../../../pages/_app';

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent | null
}

const DayContentDialog: React.FC<IProps> = ({ open, onClose, dayContent }) => {
    const { mutate: create, isLoading, isSuccess } = useCreateDayContentMutation();
    const { mutate: update, isLoading: isUpdating, isSuccess: isUpdated } = useUpdateDayContentMutation();
    const [data, setData] = useState<IDayContent>(dayContent ? { ...dayContent } : { ...INIT_DAY_CONTENT });
    const currentDate = { year: data?.date?.split('-')[2], months: data?.date?.split('-')[0], day: data?.date?.split('-')[1] }
    const { data: oldData, isFetching } = useGetDayContentQuery(currentDate.year, currentDate.months, currentDate.day);

    useEffect(() => {
        if (oldData && !isFetching) {
            setData({ ...oldData });
        }
    }, [oldData, isFetching]);

    useEffect(() => {
        setData(dayContent ? { ...dayContent } : INIT_DAY_CONTENT)
    }, [dayContent])

    useEffect(() => {
        if (isUpdated || isSuccess) {
            setData(INIT_DAY_CONTENT);
            onClose();
        }
    }, [isUpdated, isSuccess])
    console.log(444, data);
    return (
        <Dialog open={open} onClose={() => { setData(INIT_DAY_CONTENT); onClose(); }} maxWidth="lg" fullWidth fullScreen>
            <Box component="form">
                {(isLoading || isUpdating || isFetching) && <BackDrop />}
                <DialogTitle>Ручное редактирование каледарного дня</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} alignItems="flex-start">
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                            <Typography variant='h4'>День:</Typography>
                            <Box sx={{ width: "200px" }}>
                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    value={(data && data.date) ? moment(data.date, DATE_CONTENT_FORMAT) : null}
                                    onChange={(v: Moment | null) => setData({ ...data, date: (v || moment()).format(DATE_CONTENT_FORMAT) })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Stack>
                        {data && <InfoTable data={data} setData={setData} />}
                        {data && <EventsTable data={data} setData={setData} />}
                        <Typography variant='h4'>Предпросмотр</Typography>
                        <Stack direction="row" spacing={2}>
                            <IntlProvider locale={"ru"} messages={messages["ru"]}>
                                <Paper elevation={1}>
                                    <DayView dayContent={dayContentsForDayView(data)} />
                                </Paper>
                            </IntlProvider>
                            <IntlProvider locale={"en"} messages={messages["en"]}>
                                <Paper>
                                    <DayView dayContent={dayContentsForDayView(data)} />
                                </Paper>
                            </IntlProvider>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setData(INIT_DAY_CONTENT); onClose(); }} color="secondary" variant='contained'>Отмена</Button>
                    <Button variant='contained' onClick={() => { data._id ? update({ body: { ...data } }) : create({ body: { ...data } }) }}>Сохранить</Button>
                </DialogActions>
            </Box>
        </Dialog >
    )
}

export default DayContentDialog;

