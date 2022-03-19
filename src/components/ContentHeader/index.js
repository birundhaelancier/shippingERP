import react from 'react';
import './contentheader.css';
const ContentHeader = ({ headerTitle }) => {
    return (
        <div className='headerContainer'>
            <div className='headerTitle'>{headerTitle}</div>
        </div>
    )
}
export default ContentHeader;