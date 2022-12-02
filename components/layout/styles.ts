import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";

export const DRAWER_WIDTH = "321px";
export const TOOLBAR_HEIGHT = "64px";

export const mobileDrawer: SxProps<Theme> = {
    display: { xs: 'block', md: 'none' },
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
    },
};

export const deskTopDrawer: SxProps<Theme> = {
    display: { xs: 'none', md: 'block' },
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box', width: DRAWER_WIDTH
    },
};

