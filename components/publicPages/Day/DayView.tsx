import { Box, Paper, Typography, List, Stack, ListItemAvatar, Avatar, ListItemText, Divider, ListItem } from '@mui/material'
import { IDayContent } from '../../../models/DayContent';

interface IProps {
    dayContent: IDayContent;
}

const DayView: React.FC<IProps> = ({ dayContent }) => {
    return (
        <Stack spacing={{ xs: 1, sm: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>

                <Typography variant="h3" mb={2}> Понедельник 28 ноября 2022 / 15 ноября 2022</Typography>

                <Typography variant="h4" mb={2}> Седмица 25-я по Пятидесятнице. Глас седьмый.</Typography>
                <Typography variant="h5" mb={2}>
                    2 Сол., 274 зач., I, 1–10. Лк., 75 зач., XIV, 12–15. Мч.: Еф., 233 зач., VI, 10–17. Лк., 64 зач., XII, 8–12.
                </Typography>
                <Typography variant="h5" mb={2}> Рождественский пост. Монастырский устав: cухоядение (хлеб, овощи, фрукты)</Typography>
            </Paper >
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "16px" }}>
                    {dayContent?.content.find(v => v.lang)?.events.map(v => (
                        <Box key={v.title}>
                            <ListItem alignItems="flex-start" key={v.title}>
                                {false && < ListItemAvatar >
                                    <Avatar alt={v.title} src={"v.img"} />
                                </ListItemAvatar>}
                                <ListItemText
                                    primary={v.title}
                                    secondary={v.year &&
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {`(${v.year})`}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        </Box>
                    ))}
                </List>
            </Paper >
        </Stack >
    )
}
export default DayView
