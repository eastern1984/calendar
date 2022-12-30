import { useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material'
import moment from 'moment';
import { IDayContent } from '../../../models/DayContent';
import { useDeleteDayContentMutation } from '../../../requests/hooks/dayContentHooks';


const EMPTY_EVENT = {
    category: 0,
    serviceType: 0,
    saintType: 0,
    title: "",
    year: "",
}

interface IProps {
    open: boolean,
    onClose: () => void,
    dayContent: IDayContent
}

const DeleteDialog: React.FC<IProps> = ({ open, dayContent, onClose }) => {
    const { mutate, isLoading, isSuccess } = useDeleteDayContentMutation();

    const onDelete = () => {
        mutate(dayContent._id!);
    }

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Box>
                <DialogTitle>Удаление</DialogTitle>
                <DialogContent>
                    <Typography variant="h3">{`Вы уверены, что хотите удалить объект с информацией о ручном редактировании дня: ${moment(dayContent?.date)}?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant='contained'>Закрыть</Button>
                    <Button onClick={onDelete} color="error" variant='contained'>Удалить</Button>
                </DialogActions>
            </Box>
        </Dialog >

    )
}

export default DeleteDialog;

