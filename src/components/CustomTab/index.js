import React, { useState, useEffect, useRef } from 'react';
import MenuPopover from '../../pages/layouts/dashboard/MenuPopOver';
import { Collapse, Tabs } from 'antd';
import { Avatar, IconButton } from '@mui/material';
import MenuPopOver from '../PopOver';

import './customTab.css';

const CustomTab = ({ tabArray, getMenuValue }) => {
    const { TabPane } = Tabs;
    const { Panel } = Collapse;
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function callback(key) {
        console.log(key);
    }

    return (
        <div className='tabContainer'>
            <div className='tableWeb'>
                <Tabs defaultActiveKey="0">
                    {tabArray.map((data, index) => {
                        return (
                            <>
                                <TabPane
                                    tab={
                                        <>
                                            <div className='tabHeading'>
                                                <div className='iconView'>{data.icon}</div>
                                                <div className='tabTitle'>{data.title}</div>
                                                {data?.actionVal && data.actionVal.length > 0 && <MenuPopOver content={data.actionVal} getListValue={(data) => getMenuValue(data)} />}
                                            </div>
                                        </>
                                    }
                                    key={index}
                                >
                                    {data.description}
                                </TabPane>
                            </>
                        )
                    })}
                </Tabs>
            </div>
            <div className='tableMobile'>
                <Collapse defaultActiveKey={['0']} onChange={callback} accordion>
                    {tabArray.map((data, index) => {
                        return (
                            <Panel header={data.title} key={index}>
                                {data.description}
                            </Panel>
                        )
                    })}

                </Collapse>
            </div>
        </div>
    )
}

export default CustomTab;