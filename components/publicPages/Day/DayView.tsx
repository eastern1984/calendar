import { Button, Paper, Typography, List, Stack } from '@mui/material'
import { IntlShape, useIntl } from 'react-intl';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import { IDayContent, IDayView, IDayViewContent } from '../../../models/DayContent';
import { SERVICE_TYPE, SAINT_TYPE, CATEGORY, CATEGORY_TYPES } from '../../../models/DayEvent';
import moment, { Moment } from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
    dayContent: IDayView | null;
}

export const getWeekInfo = (intl: IntlShape, weekNumber: number, glas: number) => {
    return `${intl.formatMessage({ id: "week" })} ${weekNumber}-${intl.formatMessage({ id: "weekNumberEnd" })} ${intl.formatMessage({ id: "afterPentecost" })}. ${intl.formatMessage({ id: "glas" })} ${glas}.`
};

export const WeekDayName: React.FC<{ intl: IntlShape, day?: string }> = ({ intl, day }) => {
    const date = day ? moment(day, DATE_CONTENT_FORMAT) : moment();
    const oldStyleDate = date ? moment(date, DATE_CONTENT_FORMAT).add("-13", "d") : moment().add("-13", "d");
    let weekDayName = date.locale(intl.locale).format("dddd");
    weekDayName = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);

    return (
        <Typography variant="h3" mb={2}>
            {weekDayName} {date.locale(intl.locale).format("DD MMMM YYYY")}
            <Typography variant="body1" component="span"> ({oldStyleDate.locale(intl.locale).format("DD MMMM YYYY")} {intl.formatMessage({ id: "old style" })})</Typography>
        </Typography>
    );
};

export const DayHeader: React.FC<{ intl: IntlShape, day?: string, content?: IDayViewContent }> = ({ intl, day, content }) => {
    const { push } = useRouter();
    const date = day ? moment(day, DATE_CONTENT_FORMAT) : moment();
    const weekInfo = (content?.weekInfo !== undefined) ? content?.weekInfo : getWeekInfo(intl, content?.weekInfoData?.weekNumberFromPentecost || 0, content?.weekInfoData?.glas || 0);

    const goToDate = (shiftByDay: number) => {
        const newDate = date.add(shiftByDay, "day");
        push(`/${newDate.format('YYYY')}/${newDate.format('MM')}/${newDate.format('DD')}`);
    }

    return (
        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
            <WeekDayName intl={intl} day={day} />
            <Typography variant="h4" mb={2}>{weekInfo}</Typography>
            <Typography variant="h5" mb={2}>{content?.description}</Typography>
            <Stack direction={"row"} spacing={1}>
                <Button variant='outlined' onClick={() => goToDate(-2)}>{date.add(-1, "day").locale(intl.locale).format("DD MMMM")}</Button>
                <Button variant='outlined' onClick={() => goToDate(0)}>{date.add(2, 'day').locale(intl.locale).format("DD MMMM")}</Button>
            </Stack>
        </Paper >
    );
};

export const DayContent: React.FC<{ intl: IntlShape, content?: IDayViewContent }> = ({ intl, content }) => {
    const greatHoliday = content?.events.find(v => v.category === CATEGORY_TYPES.GREAT_HOLIDAY);

    return (
        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "16px" }}>
                <Stack spacing={1}>
                    {greatHoliday && <Typography variant="h4" mb={2} color="red">{greatHoliday.title}</Typography>}
                    {content?.events
                        .filter(v => ((v.category === CATEGORY_TYPES.SAINT) || (v.category === CATEGORY_TYPES.SAINTS) || (v.category === CATEGORY_TYPES.ICON) || (v.category === CATEGORY_TYPES.NOT_FIXED)))
                        .map(v => (
                            <Stack key={v.title} direction="row" spacing={1}>
                                {false && (!SERVICE_TYPE[v.serviceType].img ? "" : (v.category === 2) ?
                                    <Image src={"/images/1-holiday.gif"} alt="" width={25} height={20} /> :
                                    (v.serviceType !== null) && <Image src={SERVICE_TYPE[v.serviceType].img} alt="" width={20} height={20} />)
                                }
                                <Typography
                                    component="span"
                                    variant="h5"
                                >
                                    {v.saintType && intl.formatMessage({ id: SAINT_TYPE[v.saintType] })} {v.title} {v.year && (v.year !== "0") && `(${v.year})`}
                                </Typography>
                            </Stack>
                        ))}
                </Stack>
            </List>
        </Paper >
    );
};
export const DayReadings: React.FC<{ readings?: string }> = ({ readings }) => {
    return (
        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography variant="body2" mb={2}>Чтения дня из Священного Писания</Typography>
            <Typography variant="h5" mb={2}>{readings}</Typography>
        </Paper>
    );
};
export const DaySpecialty: React.FC<{ intl: IntlShape, content?: IDayViewContent }> = ({ intl, content }) => {
    const specialty = content?.events.find(v => v.category === CATEGORY_TYPES.SPECIALTY);

    return (<>
        {specialty &&
            <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                <Typography variant="body1" mb={2} fontStyle="italic"> {intl.formatMessage({ id: "liturgy" })} {specialty.title}</Typography>
            </Paper>
        }
    </>
    );
};

const DayView: React.FC<IProps> = ({ dayContent }) => {
    const intl = useIntl();
    const content = dayContent?.content.find(v => v.lang == intl.locale);

    return (
        <Stack spacing={{ xs: 1, sm: 2 }}>
            <DayHeader intl={intl} day={dayContent?.date} content={content} />
            <DayContent intl={intl} content={content} />
            <DayReadings readings={content?.readings} />
            <DaySpecialty intl={intl} content={content} />
        </Stack >
    )
}
export default DayView
