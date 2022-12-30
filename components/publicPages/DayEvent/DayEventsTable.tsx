import { Stack, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Backdrop } from '@mui/material'
import { useState } from 'react'
import { IDayEvent, CATEGORY, SERVICE_TYPE, SAINT_TYPE } from '../../../models/DayEvent';
import { useGetDayEventsQuery } from '../../../requests/hooks/dayEventsHooks';

interface IProps {

}

const DayEventsTable: React.FC<IProps> = ({ }) => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(0);
    const { data, isLoading } = useGetDayEventsQuery(filter, page, limit);

    return (
        <>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell >Категория</TableCell>
                            <TableCell >Служба</TableCell>
                            <TableCell >Ранг</TableCell>
                            <TableCell align="right">Описание RU</TableCell>
                            <TableCell align="right">Описание EN</TableCell>
                            <TableCell >Год</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data || []).map((v: IDayEvent) => (
                            <TableRow key={v._id}>
                                <TableCell>{v.date}</TableCell>
                                <TableCell>{(v.category !== undefined) ? CATEGORY[v.category] : "-"}</TableCell>
                                <TableCell>{(v.serviceType !== undefined) ? SERVICE_TYPE[v.serviceType].name : "-"}</TableCell>
                                <TableCell>{(v.saintType !== undefined) ? SAINT_TYPE[v.saintType] : "-"}</TableCell>
                                <TableCell>{v.titles[0]?.text}</TableCell>
                                <TableCell>{v.titles[1]?.text}</TableCell>
                                <TableCell>{v.year}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button color="secondary" variant="contained" onClick={() => { }}>Правка</Button>
                                        <Button color="success" variant="contained" onClick={() => { }}>Просмотр</Button>
                                        <Button color="error" variant="contained" onClick={() => { }}>Удалить</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DayEventsTable;

