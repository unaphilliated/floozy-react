import { createTheme } from '@mui/material/styles';

// Configure MUI theme here. See README.md for links to documentation.
// use global.scss for traditional styling.

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // default border
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },

          // hover
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
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
  },
});

export default theme;