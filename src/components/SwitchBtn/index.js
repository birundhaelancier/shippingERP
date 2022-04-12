import react from 'react';
import { Switch } from 'antd';
import './switch.css';

const CustomSwitch =({onSwitchChange, size})=>{
    return(
        <div className='switchBtn'>
            <Switch size={size} onChange={onSwitchChange} />
        </div>
    )
}

export default CustomSwitch;