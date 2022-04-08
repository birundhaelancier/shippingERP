import react, { useState } from 'react';
import { Popover, Button } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import './popover.css';

const MenuPopOver = ({ content, getListValue }) => {
    const [visible, setvisible] = useState(false);
    const getList = (id) => {
        getListValue(id)
    }

    const showData = (
        <div>
            {content.map((val) => {
                return <div className='menuList' onClick={() => getList(val.id)}>{val.value}</div>
            })}
        </div>
    );
    return (
        <Popover placement="bottom" content={showData} title="Sub Tab" trigger="click">
            <div className='plus_Icon'><PlusOutlined /></div>
        </Popover>
    )
}
export default MenuPopOver;