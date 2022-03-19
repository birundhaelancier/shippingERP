import react from 'react';
import './topHeader.css';

export default function HeaderView() {
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
    return (
        <div className="topHeader">
            <img src={image} style={{ width: '80%', borderRadius: '40px' }} />
            <div>Shipping ERP</div>
        </div>
    );
}