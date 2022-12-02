import { Container, Typography, Box, Stack } from '@mui/material'
import { useIntl } from 'react-intl';

const Footer: React.FC = () => {
    const intl = useIntl();

    return (
        <Box sx={{ bgcolor: "common.white", minHeight: "40px" }}>
            <Container>
                <Stack alignItems="center" justifyContent="space-around" minHeight="40px" direction="row">
                    <Typography variant="body2" color="text.secondary" >{intl.formatMessage({ id: "footer.info" })}</Typography>
                </Stack>
            </Container>
        </Box >
    )
}
export default Footer
