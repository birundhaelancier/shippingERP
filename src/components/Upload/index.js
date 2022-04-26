import react from 'react';
import { CloudUpload } from '@mui/icons-material';
import './upload.css';

const UploadFiles = ({ uploadLabel, show, getOnChangeFile, showLabel, fileId, showLabelView  }) => {
    let url = 'https://elancier.xyz/shipping_erp/public/upload/customers/';
    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        getOnChangeFile(selectedFile, selectedFile.name);
    }
    
    return (
        <>
            {show ?
                <div className='btn_upload'>
                    <lable className='labeltxt'>{uploadLabel}</lable>
                    <label for={`file-upload${fileId}`} class="btn-file-upload">
                        <div className='cloudIcon'>
                            <CloudUpload />
                           {!showLabelView &&  <div>{typeof showLabel == 'object' ? showLabel && showLabel?.name : showLabel && showLabel.split("_")[showLabel.split("_").length - 1] }</div>}
                        </div>
                    </label>
                    <input id={`file-upload${fileId}`} type="file" onChange={(e) => handleFile(e)} />
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