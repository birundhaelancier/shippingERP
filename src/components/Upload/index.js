import react from 'react';
import { CloudUpload } from '@mui/icons-material';
import './upload.css';

const UploadFiles = ({ uploadLabel, show , getOnChangeFile }) => {
    const handleFile = (event) => {
        console.log(event,'ii')
        getOnChangeFile(event);
    }
    return (
        <>
            {show ?
                // <div className='cloudIcon'><CloudUpload /></div>
                <div className='btn_upload'>
                    <lable className='labeltxt'>{uploadLabel}</lable>
                    <label for="file-upload" class="btn-file-upload">
                        <div className='cloudIcon'><CloudUpload /></div>
                    </label>
                    <input id="file-upload" type="file" onChange={(e) => handleFile(e)} />
                </div>
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