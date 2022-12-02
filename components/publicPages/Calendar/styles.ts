import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";

export const item: SxProps<Theme> = {
    border: theme => "1px solid #EEF0EF",
    m: 0,
    cursor: 'pointer',
    p: "8px",
    "&:hover": {
        border: theme => `2px solid ${theme.palette.primary.main}`,
        m: "-1px"
    }
};