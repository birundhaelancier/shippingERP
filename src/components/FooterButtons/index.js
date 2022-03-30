import react from 'react';
import Grid from '@mui/material/Grid';
import CustomButton from '../Button';
import { Save, ArrowBack, ArrowForward, HighlightOff } from '@mui/icons-material';
import './footerBtn.css';

const FooterBtn = ({ backBtn, nextBtn, saveBtn, onSubmit }) => {
    return (
        <Grid item xs={12} spacing={2} direction="row" container className='footerBrnContainer' >
            <Grid item xs={7} md={7} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-end'} container>
                <Grid item xs={3} md={3} sx={12} sm={12} >
                    <CustomButton btnName="Save Stage" custombtnCSS="Primary" startIcon={<Save />} onBtnClick={onSubmit} />
                </Grid><Grid item xs={3} md={3} sx={12} sm={12} >
                    <CustomButton
                        btnName="Cancel" custombtnCSS="Cancel" startIcon={<HighlightOff />} onBtnClick={onSubmit} />
                </Grid>
               
            </Grid>
            <Grid item xs={5} md={5} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-end'} container>
                {backBtn && <Grid item xs={3} md={3} sx={12} sm={12} >
                    <CustomButton btnName="Back" custombtnCSS="Cancel" startIcon={<ArrowBack />} onBtnClick={onSubmit} />
                </Grid>}
                {nextBtn && <Grid item xs={3} md={3} sx={12} sm={12} >
                    <CustomButton
                        btnName="Next" custombtnCSS="Primary" startIcon={<ArrowForward />} onBtnClick={onSubmit} />
                </Grid>}

            </Grid>

        </Grid>
    )
}

export default FooterBtn;