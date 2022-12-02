import { Box, Paper, Typography, List, Stack, ListItemButton, Button, ListItemAvatar, Avatar, ListItemText, Divider, IconButton } from '@mui/material'
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetDayQuery } from '../../../requests/hooks/calendarHooks';

const Day: React.FC = ({ }) => {
    const { data, isFetching } = useGetDayQuery();

    const DATA = [
        { img: "/images/images.jfif", title: "Начало Рождественского поста", subtitle: "Икона" },
        { img: "/images/28.jpg", title: "Мучеников и исповедников Гурия, Самона (299-306) и Авива (322)", subtitle: "2 иконы, 3 проповеди, 1 видео" },
        { img: "", title: "Мчч. Елпидия, Маркелла и Евстохия(361-363)", subtitle: "Проповедь, 2 видео" },
        { img: "/images/kupyatickaya_595.jpg", title: "Купятицкой иконы Божией Матери", subtitle: "Икона, проповедь" },
    ]

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
                    {DATA.map(v => (
                        <Box key={v.subtitle}>
                            <ListItemButton alignItems="flex-start" key={v.title}>
                                <ListItemAvatar>
                                    <Avatar alt={v.title} src={v.img} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={v.title}
                                    secondary={v.subtitle &&
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {v.subtitle}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItemButton>
                        </Box>
                    ))}
                </List>




            </Paper >
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant='h6' align="center"> Тропарь мучеников и исповедников Гурия, Самона и Авива, глас 5:</Typography>
                        <Typography variant='h5'>Чудеса́ святы́х Твои́х му́ченик/ сте́ну необори́му нам дарова́вый, Христе́ Бо́же,/ тех моли́твами сове́ты язы́ков разори́,/ Це́рковь Святу́ю укрепи́,// я́ко Еди́н Благ и Человеколю́бец.</Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant='h6' align="center">Кондак мучеников и исповедников Гурия, Самона и Авива, глас 2:</Typography>
                        <Typography variant='h5'>С высоты́, му́дрии, благода́ть прие́мше,/ су́щим во искуше́ниих предстои́те, всехва́льнии./ Те́мже отрокови́цу, святи́и, от сме́рти го́рькия изба́висте,// вы бо вои́стинну есте́ Еде́су сла́ва и ми́ру ра́дость.</Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack >
    )
}
export default Day
