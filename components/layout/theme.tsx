import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        green?: Palette["primary"];
    }
    interface PaletteOptions {
        green?: PaletteOptions["primary"];
    }
    interface TypeBackground {
        secondary?: TypeBackground["default"];
    }
}

// Create a theme instance.

let getTheme = () => responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: process.env.NEXT_PUBLIC_PRIMARY_COLOR ?? "#044D72",
        },
        secondary: {
            main: process.env.NEXT_PUBLIC_SECONDARY_COLOR ?? "#E78D69",
        },
        error: {
            main: "#E04B51",
        },
        success: {
            main: "#079453",
        },
        warning: {
            main: "#F09A1A",
        },
        background: {
            default: "#F8F8F8",
            secondary: "#F3F3F3",
        },
        text: {
            primary: "#0E1210",
            secondary: "#6A6A6A",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Archivo', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontWeight: "bold", fontSize: 48 },
        h2: { fontWeight: "bold", fontSize: 32 },
        h3: { fontWeight: "bold", fontSize: 24 },
        h4: { fontWeight: "bold", fontSize: 20 },
        h5: { fontWeight: "600", fontSize: 16 },
        h6: { fontWeight: "600", fontSize: 14 },
        subtitle1: {},
        subtitle2: {},
        body1: {},
        body2: { fontSize: 14 },
        button: {
            textTransform: "none",
        },
        caption: {},
        overline: {},
    },

    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ ownerState, theme }) => ({
                    backgroundColor: theme.palette.common.white,
                    boxShadow: "0px 16px 24px rgba(10, 31, 68, 0.16)",
                    color: theme.palette.text.secondary,
                    padding: "8px 12px",
                }),
                arrow: ({ ownerState, theme }) => ({
                    "&:before": {
                        backgroundColor: theme.palette.common.white,
                    },
                }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: "0px 16px 24px rgba(10, 31, 68, 0.16)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    borderRadius: "4px",
                    boxShadow: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    "&:hover": { boxShadow: "none" },
                    ...(ownerState.variant === "contained" && { color: theme.palette.common.white }),
                    ...(ownerState.variant === "outlined" && { border: "1px solid #DBDBDB", color: theme.palette.common.black }),
                }),
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    "th": {
                        fontWeight: "600"
                    }
                }),
            },
        }
    },
}));

export default getTheme;
