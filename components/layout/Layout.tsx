import { Box, Stack, Typography, AppBar, Drawer, Container } from '@mui/material'
import { ReactElement, useState } from 'react'

import { deskTopDrawer, mobileDrawer, DRAWER_WIDTH, TOOLBAR_HEIGHT } from './styles';
import Header from './Header';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Footer from './Footer';
import Sidebar from './Sidebar';

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
            <Drawer sx={mobileDrawer} anchor="left" open={open} onClose={() => { setOpen(false) }}>
                <Sidebar intl={intl} onClick={() => setOpen(false)} onClose={() => { setOpen(false) }} />
            </Drawer>
            <Drawer variant="permanent" sx={deskTopDrawer} open>
                <Sidebar intl={intl} onClick={() => setOpen(false)} />
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

