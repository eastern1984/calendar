import { Box, Paper, Typography, List, Stack, ListItemButton, Button, ListItemAvatar, Avatar, ListItemText, Divider, IconButton } from '@mui/material'

import { useGetDayQuery } from '../../../requests/hooks/calendarHooks';
import DayView from './DayView';
import BackDrop from '../../common/BackDrop';
import { useRouter } from 'next/router';
import moment from 'moment';

interface IProps {
}

const Day: React.FC = (props) => {
    const { query } = useRouter();
    const date = (query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment();
    const { data, isFetching } = useGetDayQuery(date.format('YYYY'), date.format('MM'), date.format('DD'));
    console.log(123321, props);
    return (
        <Box position="relative">
            {isFetching && <BackDrop />}
            <DayView dayContent={data} />
        </Box>
    )
}
export default Day
