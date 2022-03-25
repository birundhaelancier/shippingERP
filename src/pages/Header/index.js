import react from 'react';
import './topHeader.css';
// import AccountPopover from '../Dashboard/AccountPopover';
import { Stack , Toolbar } from '@mui/material';



export default function HeaderView() {
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
    return (
        <div className="topHeader">
            <img src={image} style={{ width: '90%', borderRadius: '40px',paddingLeft: '10px' }} />
            <div style={{color:"#155a6e"}}>Shipping ERP</div>
        </div>
    );
}