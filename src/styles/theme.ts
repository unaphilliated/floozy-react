import { createTheme } from '@mui/material/styles';

// Configure MUI theme here. See README.md for links to documentation.
// use global.scss for traditional styling.

let theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#6d3b57',
      light: '#997689',
      dark: '#4c293d',
      contrastText: '#fff',
    },
  }
});

theme = createTheme(theme, 
{
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.dark,
          color: '#fff',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // default border
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },

          // hover
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#dfdfdf",
          },

          // focused
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },

          // disabled
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "#777",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",

          // focused label
          "&.Mui-focused": {
            color: "#1976d2",
          },

          // disabled label
          "&.Mui-disabled": {
            color: "#777",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ffffff", // text inside input

          // placeholder styling
          "&::placeholder": {
            color: "#aaa",
            opacity: 1,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#ffffff", // icon color

          "&:hover": {
            color: "#dfdfdf",
          },
        },
      },
    },
  },
});

export default theme;