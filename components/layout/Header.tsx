import { Stack, Typography, AppBar, Toolbar, IconButton, ListItemText, FormControl, InputLabel, Select, MenuItem, OutlinedInput, useRadioGroup } from '@mui/material'
import { ReactElement, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

const LANGUAGES = [{ text: "Русский", value: "ru", icon: "" }, { text: "English", value: "en", icon: "" }];

interface IProps {
    onOpenMenu: () => void
}

const Header: React.FC<IProps> = ({ onOpenMenu }) => {
    const { push, asPath, locale } = useRouter();
    const [language, setLanguage] = useState(locale);
    const intl = useIntl();

    useEffect(() => {
        if (locale !== language) {
            push(asPath, asPath, { locale: language })
        }
    }, [language, push]);

    return (
        <Toolbar>
            <Stack direction="row" justifyContent="space-between" width={"100%"} spacing={1}>
                <Stack direction="row" alignItems="center">
                    <IconButton color="inherit" aria-label="open drawer" onClick={() => { onOpenMenu() }} edge="start" sx={{ mr: 2, display: { xs: "initial", md: "none" } }}                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" component="h1" noWrap>
                        {intl.formatMessage({ id: "head.title" })}
                    </Typography>
                </Stack>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <Select
                        sx={{ bgcolor: "#FFF", ".MuiSelect-select": { p: "8px" } }}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {LANGUAGES.map(v => (
                            <MenuItem key={v.value} value={v.value}>{v.text}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Toolbar>
    )
}
export default Header
