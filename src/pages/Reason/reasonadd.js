import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import GeneralInfo from './TabPages/generalInfo';



export default function AddReason(props) {
    const params = new URLSearchParams(props.location.search);

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo reasonId={params.get("user_id")} reasonName={params.get("reasonName")} /> },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: ''},
        // { icon: '', title: 'Payments Terms', description: 'de65' },
        { icon: '', title: '', description: '' },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Master"} subTitle='Reason' heading={'Reason Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}