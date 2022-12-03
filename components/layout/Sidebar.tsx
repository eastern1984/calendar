import { useState, useEffect } from "react";
import { TextField, Box, Stack, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TableViewIcon from '@mui/icons-material/TableView';
import Link from 'next/link';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import { IntlShape } from 'react-intl';
import Image from 'next/image';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import { Routes } from '../../interfaces/types';

interface IProps {
    intl: IntlShape;
    onClick: () => void;
}

const getMenu = (intl: IntlShape) => [
    { title: intl.formatMessage({ id: "menu.calendar" }), icon: <CalendarMonthIcon />, link: Routes.CALENDAR },
    { title: intl.formatMessage({ id: "menu.dayEvent" }), icon: <TableViewIcon />, link: Routes.TABLE },
    { title: intl.formatMessage({ id: "menu.dayTable" }), icon: <TableViewIcon />, link: Routes.TABLE_CONTENT },
    { title: intl.formatMessage({ id: "menu.contacts" }), icon: <ContactSupportIcon />, link: Routes.CONTACTS }
];

const Sidebar: React.FC<IProps> = ({ intl, onClick }) => {
    const { push, query } = useRouter();
    const [date, setDate] = useState<Moment | null>((query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment());
    const handleChange = (newValue: Moment | null) => {
        setDate(newValue);
        push(newValue ? `/${newValue.format('YYYY')}/${newValue.format('MM')}/${newValue.format('DD')}` : "/");
    };

    useEffect(() => {
        if (query.month && query.year && query.day) {
            setDate(moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY'));
        }
    }, [query.month, query.year, query.day]);

    return (
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
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
    );
}
export default Sidebar
