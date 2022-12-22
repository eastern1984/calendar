import { Box, Typography, Stack, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { IDayContent } from '../../../db/models/DayContent';

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent | null
}

const ViewDialog: React.FC<IProps> = ({ open, dayContent, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Box>
                <DialogTitle>Просмотр дня</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Закрыть</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default ViewDialog;

