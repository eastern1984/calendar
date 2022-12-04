import { Stack, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Backdrop } from '@mui/material'
import { useState } from 'react'
import { useGetDayContentsQuery } from '../../../requests/hooks/dayContentHooks';
import moment, { Moment } from 'moment';
import { IDayContent } from '../../../models/DayContent';

interface IProps {
    onUpdate: (v: IDayContent) => void
    onView: (v: IDayContent) => void
    onDelete: (v: IDayContent) => void
}

const DayContentTable: React.FC<IProps> = ({ onUpdate, onView, onDelete }) => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(0);
    const { data, isLoading } = useGetDayContentsQuery(filter, page, limit);

    return (
        <>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell >Список событий</TableCell>
                            <TableCell >Чтения</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data || []).map((v: IDayContent) => (
                            <TableRow key={v._id}>
                                <TableCell>{v.date}</TableCell>
                                <TableCell> - </TableCell>
                                <TableCell> - </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button color="secondary" variant="contained" onClick={() => { onUpdate(v) }}>Правка</Button>
                                        <Button color="success" variant="contained" onClick={() => { onView(v) }}>Просмотр</Button>
                                        <Button color="error" variant="contained" onClick={() => { onDelete(v) }}>Удалить</Button>
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

export default DayContentTable;

