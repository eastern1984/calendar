import { TextField, Stack, Button, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import BackDrop from '../../common/BackDrop';

export default function DayContent() {
    const { push } = useRouter();
    const { data: session, status } = useSession();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (session) {
            setError(false);
            push('/day-content');
        }
        console.log(session, status);
    }, [session, status]);

    const onSignIn = async () => {

        const result = await signIn('credentials', { login, password, redirect: false });
        if (result?.status !== 200) {
            setError(true);
            setLoading(false);
        }
    }

    return (
        <Stack alignItems={"center"}>
            <Paper elevation={1} sx={{ p: "16px", m: "8px", width: "280px", position: "relative" }}>
                {loading && <BackDrop />}
                <Stack justifyContent={"center"} spacing={2}>
                    <Typography variant='h4' align='center'>Авторизация</Typography>
                    <TextField onChange={(e) => { setLogin(e.target.value) }} value={login} label="Login" variant="outlined" />
                    <TextField onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" label="Password" variant="outlined" />
                    <Button onClick={() => { setLoading(true); onSignIn() }}>Войти</Button>
                    {error && <Typography variant='h6' color={"error"} align='center'>Ошибка авторизации</Typography>}
                </Stack>
            </Paper>
        </Stack>
    )
}
