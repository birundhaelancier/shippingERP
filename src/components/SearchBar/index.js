import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid';
import CustomButton from '../Button';
import LabelBoxes from '../labelbox/labelbox';
import { Groups, FileUpload, FilterList, ArrowDropDown, Menu } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../pages/layouts/dashboard/MenuPopOver';
import './search.css';
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ActionVal = [
    { id: 1, value: 'Sort' },
    { id: 2, value: 'Filter' }
  ]
  return (
    <div className={classes.root}>
      <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={6} md={1.2} sx={6} sm={6}>
          <CustomButton btnName="Add" custombtnCSS="Primary" startIcon={<Groups />} onBtnClick={props.onAddClick} />
        </Grid>
        <Grid item xs={6} md={1.4} sx={6} sm={6}>
          <CustomButton btnName="Upload" custombtnCSS="Cancel" startIcon={<FileUpload />} />
        </Grid>
        <Grid item xs={6} md={1.2} sx={6} sm={6}>
          <CustomButton btnName="Filter" custombtnCSS="Cancel" startIcon={<FilterList />} />
        </Grid>
        <Grid item xs={6} md={3.3} sx={6} sm={6} className='hideSearch'>
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
        <Grid item xs={6} md={3.5} sx={6} sm={6}>
        </Grid>
        <Grid item xs={6} md={1.3} sx={6} sm={6} className='action_btn'>
          <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              padding: 0,
              width: 100,
              height: 44,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: 'transparent',
                }
              })
            }}
          >
            <Avatar className='hamberMenu'><Menu /></Avatar>
          </IconButton>
          <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            // style={{background:"#f3f7ff"}}
            sx={{ width: 150 }}
          >
            <div className='action_pop_over'>
              {ActionVal.map((data) => {
                return (
                  <div>
                    <div>{data.value}</div>
                  </div>
                )
              })}
            </div>
          </MenuPopover>

          {/* <CustomButton btnName="Action" custombtnCSS="Cancel" startIcon={<ArrowDropDown />} /> */}
        </Grid>
      </Grid>

    </div >
  );
}
export default QuickSearchToolbar;

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-around',
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
        border: `1px solid #141d56`,
        padding: '7px',
        borderRadius: '5px',
        marginTop: '2px',
      },
    },
  }),
  { defaultTheme },
);
