import { Typography, Grid, Paper } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MONTHS } from '../Calendar/Calendar';
import { getItem } from './styles';

function getWeekDays(locale: string) {
    var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
    var weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
}

const getDayItem = (year: string, month: string, day: number, invisible = false) => (
    <Grid key={day} item xs={12 / 7}>
        <Link href={(year && month) ? `/${year}/${month}/${day}` : "#"}>
            <Paper elevation={0} sx={getItem(invisible)}>
                {!invisible && <Typography variant="h6">{day + 1}</Typography>}
            </Paper>
        </Link>
    </Grid>
)

const getHeadItem = (name: string) => (
    <Grid key={name} item xs={12 / 7}>
        <Typography variant="body1" align='center'>{name}</Typography>
    </Grid>
)

const Month: React.FC = ({ }) => {
    const { query } = useRouter();
    const daysInMonth = new Date(parseInt(query.year as string), MONTHS.findIndex(v => v === query.month), 0).getDate();
    const startDayIndex = new Date(parseInt(query.year as string), MONTHS.findIndex(v => v === query.month), 1).getDay();

    return (
        <>
            <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant="h3" mb={2}> {query.month} {query.year}</Typography>

                <Grid container spacing={1}>
                    {getWeekDays("en-US").map((v) => (
                        getHeadItem(v)
                    ))}
                    {startDayIndex && Array.from(Array(startDayIndex), (v, e) => (
                        getDayItem("", "", e, true)
                    ))}
                    {daysInMonth && Array.from(Array(daysInMonth), (v, e) => (
                        getDayItem(query.year as string, query.month as string, e)
                    ))}
                </Grid>
            </Paper >
            <Paper sx={{ mt: 2, p: 2 }} elevation={0}>
                <Typography variant='h3'>Информация о месяце </Typography>
                <Typography variant='body1'>Пример : Традиция накладывать на себя пост перед испытаниями запечатлена и на страницах Ветхого Завета, и сам Спаситель явил нам постный подвиг.Мы знаем, что как ясно говорится в посте в Новом Завете, и необходимо отогнать от себя всякие искушения и лукавые мысли, будто «не в посте дело», «самое главное – ближних не обижать и добрые дела делать», как утверждают многие люди.Те, кто так говорит и не постится, наверняка и добрых дел не делают, и людей не перестают осуждать.Если человек, не желая вступать на постное поприще, ищет какие-то аргументы и находит отговорки, чтобы не поститься, – значит, все это от лукавого.Если Сам Господь сорок дней постился в пустыне, то, естественно, и мы, Его последователи, без всяких сомнений, без всяких «но» должны принимать на себя эти важные аскетические обязательства.В первую очередь для того, чтобы самим стать сильнее, а не слабее, чтобы самим стать более здоровыми, а не больными, чтобы милость Божия изливалась на нас в ответ на эту маленькую жертву, которую мы приносим Господу. </Typography>
            </Paper>
        </>
    )
}
export default Month
