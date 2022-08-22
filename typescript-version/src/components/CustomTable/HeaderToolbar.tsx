import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Toolbar, Typography, lighten, Theme, styled, createTheme, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';

// const useToolbarStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(1),
//     },
//     highlight:
//       theme.palette.type === 'light'
//         ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//         : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//     title: {
//       flex: '1 1 100%',
//     },
//   })
// );

const theme = createTheme({
  components: {
    // Name of the component
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 10,
          paddingRight: 10,
        },
        gutters: {
          backgroundColor: "#a5b6c7",
        }
      },

    },
    MuiTypography: {
      styleOverrides: {
        root: {
          flex: '1 1 100%',
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end'
        }
      }
    }
  },
});
const unselectedTheme = createTheme({
  components: {
    // Name of the component
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 10,
          paddingRight: 10,
        },

      },

    },
    MuiTypography: {
      styleOverrides: {
        root: {
          flex: '1 1 100%',
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end'
        }
      }
    }
  },
});
interface Props {
  numSelected: number;
  title: string;
}

export const TableHeaderToolbar: React.FC<Props> = (props) => {
  const { numSelected, title, children } = props;

  return (
    <ThemeProvider theme={numSelected > 0 ? theme : unselectedTheme}>
      <Toolbar
      >
        {numSelected > 0 ? (
          <Typography color="inherit" variant={'subtitle1'} component="div">
            {numSelected} Selecionados
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}
        {children}
        {/* <Tooltip title="Filtrar">
                <IconButton aria-label="filter list">
                <FilterListIcon />
                </IconButton>
              </Tooltip> */}
      </Toolbar>
    </ThemeProvider>
  );
};
