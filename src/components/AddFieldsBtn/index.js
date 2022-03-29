import react from 'react';
import { Add } from '@mui/icons-material';

import './addBtn.css';

const AddFieldsBtn = ({ fieldName, AddFieldBtn, marginView }) => {
    return (
        <div className={marginView? 'fieldsContainerNew' :'fieldsContainer'} onClick={AddFieldBtn}>
            <div className='addIcon'><Add /></div>
            <div className='fieldName'>{fieldName}</div>
        </div>
    )
}
export default AddFieldsBtn;