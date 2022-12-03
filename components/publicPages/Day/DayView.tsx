import { Box, Paper, Typography, List, Stack, ListItemAvatar, Avatar, ListItemText, Divider, ListItem } from '@mui/material'
import { useIntl } from 'react-intl';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import { IDayContent } from '../../../models/DayContent';
import { CATEGORY, SAINT_TYPE } from '../../../models/DayEvent';
import moment from 'moment';

interface IProps {
    dayContent: IDayContent | null;
}

const DayView: React.FC<IProps> = ({ dayContent }) => {
    const intl = useIntl();
    const date = dayContent ? moment(dayContent.date, DATE_CONTENT_FORMAT) : moment();
    const oldStyleDate = dayContent ? moment(dayContent.date, DATE_CONTENT_FORMAT).add("-13", "d") : moment().add("-13", "d");
    let weekDayName = date.locale(intl.locale).format("dddd");
    weekDayName = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);

    return (
        <Stack spacing={{ xs: 1, sm: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>

                <Typography variant="h3" mb={2}> {weekDayName} {date.locale(intl.locale).format("DD MMMM YYYY")} / {oldStyleDate.locale(intl.locale).format("DD MMMM YYYY")}</Typography>
                <Typography variant="h4" mb={2}> Седмица 25-я по Пятидесятнице. Глас седьмый.</Typography>
                <Typography variant="h5" mb={2}>
                    2 Сол., 274 зач., I, 1–10. Лк., 75 зач., XIV, 12–15. Мч.: Еф., 233 зач., VI, 10–17. Лк., 64 зач., XII, 8–12.
                </Typography>
                <Typography variant="h5" mb={2}> Рождественский пост. Монастырский устав: cухоядение (хлеб, овощи, фрукты)</Typography>
            </Paper >
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "16px" }}>
                    <Stack spacing={1}>
                        {dayContent?.content.find(v => v.lang == intl.locale)?.events.map(v => (
                            <Box key={v.title}>
                                {(v.category !== 1) &&
                                    <Typography
                                        component="span"
                                        variant={(v.category === 2) ? "h4" : "h5"}
                                        color={(v.category === 2) ? "error" : "text.primary"}
                                    >
                                        {(v.category === 0) && SAINT_TYPE[v.saintType]} {v.title} {v.year && `(${v.year})`}
                                    </Typography>
                                }
                                {(v.category === 1) &&
                                    <Typography
                                        component="span"
                                        variant={"body2"}
                                        color={"text.primary"}
                                    >
                                        {intl.formatMessage({ id: "liturgy" })} {v.title}
                                    </Typography>
                                }
                            </Box>
                        ))}
                    </Stack>
                </List>
            </Paper >
        </Stack >
    )
}
export default DayView
