import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";

export const getItem = (invisible: boolean): SxProps<Theme> => ({
    border: invisible ? "" : "1px solid #EEF0EF",
    m: 0,
    cursor: invisible ? "default" : 'pointer',
    p: "8px",
    "&:hover": {
        border: theme => invisible ? "" : `2px solid ${theme.palette.primary.main}`,
        m: "-1px"
    }
});