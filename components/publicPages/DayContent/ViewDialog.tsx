import { Stack, Box, Dialog, DialogTitle, DialogContent, Button, DialogActions, Paper } from '@mui/material'
import moment, { Moment } from 'moment';
import { IDayContent } from '../../../models/DayContent';
import { DATE_CONTENT_FORMAT } from '../../../controllers/DayContentController';
import { IntlProvider } from 'react-intl';
import DayView from '../Day/DayView';
import { dayContentsForDayView } from '../../../helpers/dayView';
import { messages } from '../../../pages/_app';

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent
}

const ViewDialog: React.FC<IProps> = ({ open, dayContent, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Box>
                <DialogTitle>Просмотр дня</DialogTitle>
                <DialogContent>
                    <Stack direction="row" spacing={2}>
                        <IntlProvider locale={"ru"} messages={messages["ru"]}>
                            <Paper elevation={1}>
                                <DayView dayContent={dayContentsForDayView(dayContent)} />
                            </Paper>
                        </IntlProvider>
                        <IntlProvider locale={"en"} messages={messages["en"]}>
                            <Paper>
                                <DayView dayContent={dayContentsForDayView(dayContent)} />
                            </Paper>
                        </IntlProvider>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Закрыть</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default ViewDialog;

