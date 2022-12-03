import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

interface IProps {
    text?: string;
}

const BackDrop: React.FC<IProps> = ({ text }) => {
    return (
        <>
            <Stack sx={{ zIndex: 1000, position: 'absolute', width: "100%", height: "100%", backgroundColor: "white", opacity: "0.7", top: "0", left: "0" }} alignItems="center" justifyContent="center">
               <Box sx={{ width: "40px", height: "40px" }}>
                    <CircularProgress />
                </Box>
                {text && <Typography >{text}</Typography>}
            </Stack>
        </>
    );
};

export default BackDrop;

