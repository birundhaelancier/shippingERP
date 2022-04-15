import react from 'react';
import { Switch } from 'antd';
import './switch.css';

const CustomSwitch =({onSwitchChange, checked,size})=>{
    return(
        <div className='switchBtn'>
            {/* <label className="labeltxt_togg">{"Active Status"}</label> */}
            <Switch size={size} onChange={onSwitchChange} checked={checked}/>
        </div>
    )
}

export default CustomSwitch;