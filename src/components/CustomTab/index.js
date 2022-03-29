import react from 'react';
import { Tabs } from 'antd';

import './customTab.css';

const CustomTab = ({ tabArray }) => {
    const { TabPane } = Tabs;


    return (
        <div className='tabContainer'>
            <Tabs defaultActiveKey="0">
                {tabArray.map((data, index) => {
                    return (
                        <TabPane
                            tab={
                               <div className='tabHeading'>
                                   <div className='iconView'>{data.icon}</div>
                                   <div className='tabTitle'>{data.title}</div>
                               </div>
                            }
                            key={index}
                        >
                            {data.description}
                        </TabPane>
                    )
                })}
            </Tabs>
        </div>
    )
}

export default CustomTab;