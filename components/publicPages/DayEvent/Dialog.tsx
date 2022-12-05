import { Box, Typography, Stack, Dialog, DialogTitle, DialogContent, FormHelperText, Button, DialogActions, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { FormikHelpers, useFormik } from "formik";
import { CATEGORY, IDayEvent, SAINT_TYPE, SERVICE_TYPE } from '../../../models/DayEvent';
import { useCreateDayEventMutation, useUpdateDayEventMutation } from '../../../requests/hooks/dayEventsHooks';
import { dayEventSchema } from './schemes';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

interface IProps {
    open: boolean,
    onClose: () => void,
    dayEvent: IDayEvent | null
}

const INITIAL_DATA = {
    date: "",
    category: null,
    serviceType: null,
    saintType: null,
    titles: [{ text: "", lang: "ru" }, { text: "", lang: "en" }],
    year: ""
};

const DayEventDialog: React.FC<IProps> = ({ open, onClose, dayEvent }) => {
    const { mutate: create, isLoading } = useCreateDayEventMutation();
    const { mutate: update, isLoading: isUpdating } = useUpdateDayEventMutation();

    const handleDialogSubmit = async (
        values: IDayEvent | typeof INITIAL_DATA,
        { setSubmitting, setValues, setErrors, setTouched }: FormikHelpers<IDayEvent | typeof INITIAL_DATA>,
    ) => {
        try {
            if (!!dayEvent) {
                update({ body: { ...values } });
            } else {
                create({ body: { ...values } });

            }
            setErrors({});
            setTouched({});
        } catch (e) {
            console.error(e);

        } finally {
            setSubmitting(false);
        }
    };
    const { values, handleChange, handleSubmit, handleBlur, errors, touched, setValues, setFieldValue } = useFormik<IDayEvent | typeof INITIAL_DATA>({
        enableReinitialize: true,
        initialValues: !!dayEvent ? {
            date: dayEvent.date,
            category: dayEvent.category,
            serviceType: dayEvent.serviceType,
            saintType: dayEvent.saintType,
            titles: dayEvent.titles,
            year: dayEvent.year
        } : INITIAL_DATA,
        validationSchema: dayEventSchema,
        onSubmit: handleDialogSubmit,
    });

    const updateDate = (day: string, month: number) => {
        setValues((prev: any) => ({ ...prev, 'date': `${month}-${day}` }));
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle>Создать событие</DialogTitle>
                <DialogContent>

                    <Stack spacing={2}>
                        <Typography variant='h4'>День/месяц празднования</Typography>
                        <Stack spacing={2} mt="16px" direction={"row"} maxWidth="300px">
                            <TextField label="День" onChange={(e) => { updateDate(e.target.value, parseInt(values.date?.split('-')[0])) }} value={values.date?.split('-')[1] || ""} type="number" />
                            <FormControl fullWidth>
                                <InputLabel>Месяц</InputLabel>
                                <Select value={(parseInt(values.date?.split('-')[0]) - 1) || ""} label="Ранг" onChange={(e) => { updateDate(values.date?.split('-')[1], (e.target.value as number) + 1) }}                        >
                                    {MONTHS.map((v, index) => (
                                        <MenuItem key={v} value={index}>{v}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Typography variant='h4'>Описание события</Typography>
                        <Stack spacing={2} mt="16px" direction={"row"}>
                            <FormControl fullWidth error={!!errors.category && !!touched.category} onBlur={handleBlur}>
                                <InputLabel>Категория</InputLabel>
                                <Select value={values.category} label="Категория" name="category" onChange={handleChange} >
                                    {CATEGORY.map((v, index) => (
                                        <MenuItem key={v} value={index}>{v}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{touched.category && errors.category}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Служба</InputLabel>
                                <Select value={values.serviceType} label="Служба" name="serviceType" onChange={handleChange}>
                                    {SERVICE_TYPE.map((v, index) => (
                                        <MenuItem key={v.name} value={index}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Ранг</InputLabel>
                                <Select value={values.saintType} label="Ранг" name="saintType" onChange={handleChange}                        >
                                    {SAINT_TYPE.map((v, index) => (
                                        <MenuItem key={v} value={index}>{v}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <TextField
                            label="Описание на русском"
                            onChange={handleChange}
                            name="titles[0].text"
                            value={values.titles[0]?.text || ""}
                            multiline minRows="3"
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Описание на английском"
                            onChange={handleChange}
                            name="titles[1].text"
                            value={values.titles[1]?.text || ""}
                            multiline minRows="3"
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Год"
                            onChange={handleChange}
                            name="year"
                            value={values.year}
                            error={!!errors.year && !!touched.year}
                            helperText={touched.year && errors.year}
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Отмена</Button>
                    <Button type="submit" variant='contained'>Создать</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default DayEventDialog;

