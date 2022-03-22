import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';


function escapeRegExp(value) {
   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
   const classes = useStyles();
 
   return (
     <div className={classes.root}>
       <div>
       </div>
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
