import { TextField, Box, Stack, Typography, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container } from '@mui/material'
import { ReactElement, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TableViewIcon from '@mui/icons-material/TableView';
import { deskTopDrawer, mobileDrawer, DRAWER_WIDTH, TOOLBAR_HEIGHT } from './styles';
import Link from 'next/link';
import { Routes } from '../../interfaces/types';
import Header from './Header';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Head from 'next/head';
import { useIntl, IntlShape } from 'react-intl';
import Footer from './Footer';
import Image from 'next/image';
import moment from 'moment';

const getMenu = (intl: IntlShape) => [
    { title: intl.formatMessage({ id: "menu.calendar" }), icon: <CalendarMonthIcon />, link: Routes.CALENDAR },
    { title: intl.formatMessage({ id: "menu.dayEvent" }), icon: <TableViewIcon />, link: Routes.TABLE },
    { title: intl.formatMessage({ id: "menu.contacts" }), icon: <ContactSupportIcon />, link: Routes.CONTACTS }
];

const getDrawer = (intl: IntlShape, onClick: () => void) => (
    <Stack>
        <Box m={"12px auto "}>
            <Image src={intl.formatMessage({ id: "logo" })} width="210" height="35" alt="Logo" />
        </Box>
        <Divider />
        <List>
            {getMenu(intl).map(v => (
                <Link key={v.title} href={v.link}>
                    <ListItem disablePadding onClick={() => onClick()}>
                        <ListItemButton>
                            <ListItemIcon>
                                {v.icon}
                            </ListItemIcon>
                            <ListItemText primary={v.title} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={moment()}
            onChange={(newValue) => {

            }}
            renderInput={(params) => <TextField {...params} />}
        />
    </Stack>);

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "head.title" })}</title>
                <link rel="shortcut icon" href="/Favicon.png" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>

            <AppBar position="fixed" elevation={0} sx={{ ml: "100px" }}>
                <Box sx={{ ml: { xs: '0', md: DRAWER_WIDTH } }}>
                    <Header onOpenMenu={() => setOpen(true)} />
                </Box>
            </AppBar>
            <Drawer sx={mobileDrawer} anchor="left" open={open} onClose={() => { setOpen(false) }}            >
                {getDrawer(intl, () => setOpen(false))}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={deskTopDrawer}
                open
            >
                {getDrawer(intl, () => setOpen(false))}
            </Drawer>

            <Stack bgcolor="background.default" minHeight="100vh" justifyContent="space-between" sx={{ ml: { xs: '0', md: DRAWER_WIDTH } }}>
                <Container sx={{ pt: TOOLBAR_HEIGHT, my: { xs: 0, sm: 3 }, px: { xs: 0, sm: 3 } }}>
                    {children}
                </Container>
                <Footer />
            </Stack >
        </>
    )

}



export default Layout

