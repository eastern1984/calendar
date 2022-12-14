import { Box, Paper, Typography, List, Stack, ListItemAvatar, Avatar, ListItemText, Divider, ListItem } from '@mui/material'
import { useIntl } from 'react-intl';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import moment from 'moment';
import Image from 'next/image';
import { SAINT_TYPE, SERVICE_TYPE } from '../../../interfaces/types';
import { IDayContent } from '../../../db/models/DayContent';

interface IProps {
    dayContent: IDayContent | null;
}

const DayView: React.FC<IProps> = ({ dayContent }) => {
    const intl = useIntl();
    const date = dayContent ? moment(dayContent.date, DATE_CONTENT_FORMAT) : moment();
    const oldStyleDate = dayContent ? moment(dayContent.date, DATE_CONTENT_FORMAT).add("-13", "d") : moment().add("-13", "d");
    const content = dayContent?.content.find(v => v.lang == intl.locale);
    let weekDayName = date.locale(intl.locale).format("dddd");
    weekDayName = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);
    const weekInfo = `${intl.formatMessage({ id: "week" })} ${(content?.weekInfo as any)?.weekNumberFromPentecost}-${intl.formatMessage({ id: "weekNumberEnd" })} ${intl.formatMessage({ id: "afterPentecost" })}. ${intl.formatMessage({ id: "glas" })} ${(content?.weekInfo as any)?.glas}.`;

    return (
        <Stack spacing={{ xs: 1, sm: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>

                <Typography variant="h3" mb={2}>{weekDayName} {date.locale(intl.locale).format("DD MMMM YYYY")} / {oldStyleDate.locale(intl.locale).format("DD MMMM YYYY")}</Typography>
                <Typography variant="h4" mb={2}>{weekInfo}</Typography>
                <Typography variant="h5" mb={2}>{content?.readings}</Typography>
                <Typography variant="h5" mb={2}>{content?.description}</Typography>
            </Paper >
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "16px" }}>
                    <Stack spacing={1}>
                        {dayContent?.content.find(v => v.lang == intl.locale)?.events.map(v => (
                            <Stack key={v.title} direction="row" spacing={1}>
                                {false && (!SERVICE_TYPE[v.serviceType].img ? "" : (v.category === 2) ?
                                    <Image src={"/images/1-holiday.gif"} alt="" width={25} height={20} /> :
                                    (v.serviceType !== null) && <Image src={SERVICE_TYPE[v.serviceType].img} alt="" width={20} height={20} />)
                                }
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
                            </Stack>
                        ))}
                    </Stack>
                </List>
            </Paper >
        </Stack >
    )
}
export default DayView
