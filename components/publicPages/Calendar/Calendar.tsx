import { Typography, Grid, Paper } from '@mui/material'
import Link from 'next/link';

import { item } from './styles';

export const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const Calendar: React.FC = ({ }) => {
    const year = new Date().getFullYear();

    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h3" mb={2}>Календарь {year}</Typography>

            <Grid container spacing={1}>
                {MONTHS.map(month => (
                    <Grid key={month} item xs={12 / 7}>
                        <Link href={`${year}/${month}`}>
                            <Paper elevation={0} sx={item}>
                                <Typography variant="h6">{month}</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))}

            </Grid>
        </Paper >
    )
}
export default Calendar

