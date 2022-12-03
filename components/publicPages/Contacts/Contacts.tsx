import { Box, Paper, Typography, List, Stack, ListItemButton, Button, ListItemAvatar, Avatar, ListItemText, Divider, IconButton } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';


const Contacts: React.FC = ({ }) => {
    return (
        <Paper elevation={0} sx={{ p: 2 }} >
            <Typography variant="h3" pb={2}>Контактная информация</Typography>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <AlternateEmailIcon />
                    <Typography>exarchateasia@gmail.com</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <LocationOnIcon />
                    <Typography>ул. 1 - я Останкинская, д. 7c2, Москва, 129515, Российская Федерация</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <MyLocationIcon />
                    <Typography>110 Highland Road, 549190, Singapore</Typography>
                </Stack>
            </Stack>
        </Paper >
    )
}
export default Contacts
