import react from 'react';
import './contentheader.css';
import Grid from '@mui/material/Grid';
import CustomButton from '../Button';
import { Edit } from '@mui/icons-material';


const ContentHeader = ({ userTitle, userName, openFields, mainTitle, subTitle, heading, count }) => {

    return (
        <div className='headContainer'>
            {/* <div className='userTitle'>{userTitle}</div>
            <div className='userName'>{userName}</div> */}
            {openFields ? <div className='tableView'>
                <div>{mainTitle}</div>
                <div className='editIcon'><Edit /></div>
                {/* <div className='countView'>{count + ' - '}</div> */}
                <div>{heading}</div>
            </div>
                :
                <div>
                    <div className='mainValue'><div>{mainTitle}</div> &gt; <div>{subTitle}</div> </div>
                    <div className='subHeader'>{heading}</div>
                </div>}
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