import { InputBase, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Stack, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { IDayContent } from '../../../models/DayContent';

interface IProps {
    setData: (v: IDayContent) => void,
    data: IDayContent
}

const InfoTable: React.FC<IProps> = ({ data, setData }) => {
    console.log(44444, data?.weekInfo.find(v => v.lang === 'ru')?.text);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Информация ru</TableCell>
                        <TableCell>Информация en</TableCell>
                        <TableCell>Описание ru</TableCell>
                        <TableCell>Описание en</TableCell>
                        <TableCell>Чтения ru</TableCell>
                        <TableCell>Чтения en</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >
                            <InputBase
                                onChange={(e) => { console.log(555, { ...data, weekInfo: data.weekInfo.map(v => (v.lang === 'ru') ? { ...v, text: e.target.value } : v) }); setData({ ...data, weekInfo: data.weekInfo.map(v => (v.lang === 'ru') ? { ...v, text: e.target.value } : v) }) }}
                                multiline
                                value={data?.weekInfo.find(v => v.lang === 'ru')?.text}
                            />
                        </TableCell>
                        <TableCell >
                            <InputBase multiline
                                onChange={(e) => setData({ ...data, weekInfo: data.weekInfo.map(v => (v.lang === 'en') ? { ...v, text: e.target.value } : v) })}
                                value={data?.weekInfo.find(v => v.lang === 'en')?.text}
                            />
                        </TableCell>
                        <TableCell>
                            <InputBase multiline
                                onChange={(e) => setData({ ...data, description: data.description.map(v => (v.lang === 'ru') ? { ...v, text: e.target.value } : v) })}
                                value={data?.description.find(v => v.lang === 'ru')?.text}
                            />
                        </TableCell>
                        <TableCell>
                            <InputBase multiline
                                onChange={(e) => setData({ ...data, description: data.description.map(v => (v.lang === 'en') ? { ...v, text: e.target.value } : v) })}
                                value={data?.description.find(v => v.lang === 'en')?.text}
                            />
                        </TableCell>
                        <TableCell>
                            <InputBase multiline
                                onChange={(e) => setData({ ...data, readings: data.readings.map(v => (v.lang === 'ru') ? { ...v, text: e.target.value } : v) })}
                                value={data?.readings.find(v => v.lang === 'ru')?.text}
                            />
                        </TableCell>
                        <TableCell>
                            <InputBase multiline
                                onChange={(e) => setData({ ...data, readings: data.readings.map(v => (v.lang === 'en') ? { ...v, text: e.target.value } : v) })}
                                value={data?.readings.find(v => v.lang === 'en')?.text}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InfoTable;

