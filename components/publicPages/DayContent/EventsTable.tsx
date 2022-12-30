import { InputBase, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Button, Select, MenuItem } from '@mui/material'
import { IDayContent } from '../../../models/DayContent';
import { CATEGORY, SAINT_TYPE, SERVICE_TYPE } from '../../../models/DayEvent';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const textField: SxProps<Theme> = {
    "& .MuiInputBase-root": { padding: "3px 14px" },
    "& .MuiInputBase-input": { padding: "3px 14px" },
    "& .MuiSelect-select": { padding: "1" },
};

export const EMPTY_EVENT = {
    category: 0,
    serviceType: 0,
    saintType: 0,
    titles: [{ lang: 'ru', text: '' }, { lang: 'en', text: '' }],
    year: '',
}

interface IProps {
    setData: (v: IDayContent) => void,
    data: IDayContent
}

const EventsTable: React.FC<IProps> = ({ data, setData }) => {
    const setType = (i: number, lang: string, value: number | string, type: "category" | "serviceType" | "saintType" | 'year' | "title") => {
        setData({
            ...data,
            events: [...data.events.map((v: any, index) => {
                if (i === index) {
                    if (type === 'title') {
                        v.titles = v.titles.map((t: any) => (t.lang === lang) ? { ...t, text: value } : t)
                    } else {
                        if (type === 'year') {
                            v.year = value;
                        } else {
                            v[type] = value;
                        }
                    }
                }
                return v;
            })]
        });
    }

    const deleteEvent = (i: number) => {
        setData({ ...data, events: data.events.filter((v, index) => i !== index) });
    }

    const onItemShift = (i: number, up: boolean) => {
        const item = { ...data.events[up ? i - 1 : i + 1] };
        if (up) {
            data.events[i - 1] = { ...data.events[i] };
        } else {
            data.events[i + 1] = { ...data.events[i] };
        }
        data.events[i] = { ...item };
        setData({ ...data, events: [...data.events] });
    }

    return (
        <Stack spacing={2} width={"100%"}>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Категория</TableCell>
                            <TableCell>Ранг</TableCell>
                            <TableCell>Служба</TableCell>
                            <TableCell>Описание (ru)</TableCell>
                            <TableCell>Описание (en)</TableCell>
                            <TableCell>Год (ru)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.events?.map((v, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Select value={v.category} placeholder="Служба" name="serviceType" onChange={(e) => setType(i, '', e.target.value as number, "category")} sx={textField}>
                                        {CATEGORY.map((c, index) => (
                                            <MenuItem key={c} value={index}>{c}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell >
                                    <Select value={v.saintType} placeholder="Ранг" name="saintType" onChange={(e) => setType(i, '', e.target.value as number, "saintType")} sx={textField}>
                                        {SAINT_TYPE.map((v, index) => (
                                            <MenuItem key={v} value={index}>{v}</MenuItem>
                                        ))}
                                    </Select></TableCell>
                                <TableCell >
                                    <Select value={v.serviceType} placeholder="Категория" name="category" onChange={(e) => setType(i, '', e.target.value as number, "serviceType")} sx={textField}>
                                        {SERVICE_TYPE.map((v, index) => (
                                            <MenuItem key={v.name} value={index}>{v.name}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell >
                                    <InputBase
                                        onChange={(e) => setType(i, 'ru', e.target.value, "title")}
                                        multiline
                                        value={v.titles.find(t => t.lang === 'ru')?.text}

                                        placeholder="Описание ru"

                                    />
                                </TableCell>
                                <TableCell>
                                    <InputBase multiline
                                        onChange={(e) => setType(i, 'en', e.target.value, "title")}
                                        value={v.titles.find(t => t.lang === 'en')?.text}

                                        placeholder="Описание en"

                                    />
                                </TableCell>
                                <TableCell >
                                    <InputBase multiline
                                        onChange={(e) => setType(i, 'ru', e.target.value, "year")}
                                        value={v.year}
                                        placeholder="Год ru"
                                    />
                                </TableCell>
                                <TableCell >
                                    <Stack direction={"row"} spacing={1} >
                                        <Button variant='outlined' color='secondary' disabled={i === 0} onClick={() => { onItemShift(i, true) }} size="small"><KeyboardArrowUpIcon /></Button>
                                        <Button variant='outlined' disabled={i === data?.events.length - 1} onClick={() => { onItemShift(i, false) }} size="small"><KeyboardArrowDownIcon /></Button>
                                        <Button variant='contained' color="error" onClick={() => { deleteEvent(i) }} size="small"><DeleteIcon /></Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default EventsTable;

