import react from 'react';
import './topHeader.css';
// import AccountPopover from '../Dashboard/AccountPopover';
import { Stack , Toolbar } from '@mui/material';
import logo from '../../Images/logo.jpg'


export default function HeaderView() {
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
    return (
        <div className="topHeader">
            <img src={logo} style={{ width: '90%',paddingLeft: '10px' }} />
            <div style={{color:"#fff"}}>Shipping ERP</div>
        </div>
    );
}