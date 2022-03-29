import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid';
import CustomButton from '../Button';
import { Groups, FileUpload, FilterList, ArrowDropDown } from '@mui/icons-material';




function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={6} md={1.5} sx={6} sm={6}>
          <CustomButton btnName="Add" custombtnCSS="Primary" startIcon={<Groups />} onBtnClick={props.onAddClick} />
        </Grid>
        <Grid item xs={6} md={1.5} sx={6} sm={6}>
          <CustomButton btnName="Upload" custombtnCSS="Cancel" startIcon={<FileUpload />} />
        </Grid>
        <Grid item xs={6} md={1.5} sx={6} sm={6}>
          <CustomButton btnName="Filter" custombtnCSS="Cancel" startIcon={<FilterList />} />
        </Grid>
        <Grid item xs={6} md={3} sx={6} sm={6}>
          <TextField
            variant="standard"
            value={props.value}
            onChange={props.onChange}
            placeholder="Search…"
            className={classes.textField}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  style={{ visibility: props.value ? 'visible' : 'hidden' }}
                  onClick={props.clearSearch}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} md={3} sx={6} sm={6}>
        </Grid>
        <Grid item xs={6} md={1.5} sx={6} sm={6}>
          <CustomButton btnName="Action" custombtnCSS="Cancel" startIcon={<ArrowDropDown/>} />
        </Grid>
      </Grid>

    </div>
  );
}
export default QuickSearchToolbar;

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { defaultTheme },
);
