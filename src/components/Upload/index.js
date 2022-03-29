import react from 'react';
import { CloudUpload } from '@mui/icons-material';
import './upload.css';

const UploadFiles = ({ uploadLabel, show }) => {
    return (
        <>
            {show ?
                <div className='cloudIcon'><CloudUpload /></div>
                :
                <div className='custom_upload'>
                    <lable className='labeltxt'>{uploadLabel}</lable>
                    <label for="file-upload" class="custom-file-upload">
                        <div className='upload_container'>
                            <div>Upload</div>
                            <CloudUpload />
                        </div>
                    </label>
                    <input id="file-upload" type="file" />
                </div>}
        </>
    )
}
export default UploadFiles;