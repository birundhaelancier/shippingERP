import react from 'react';
import './contentheader.css';
import Grid from '@mui/material/Grid';
import CustomButton from '../Button';

const ContentHeader = ({ userTitle, userName, openFields }) => {

    return (
        <div className='headContainer'>
            <div className='userTitle'>{userTitle}</div>
            <div className='userName'>{userName}</div>
        </div>
        // <div className='headerContainer'>
        //     <div className='headerTitle'>{headerTitle}</div>
        //     {BtnName && <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
        //         <Grid item xs={7} md={3} sx={7} sm={7}>
        //             <CustomButton btnName={BtnName} custombtnCSS="Primary" onBtnClick={openFields} />
        //         </Grid>
        //     </Grid>}
        // </div>
    )
}
export default ContentHeader;