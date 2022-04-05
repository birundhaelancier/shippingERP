import react from 'react';
import { Collapse } from 'antd';
import { Tabs } from 'antd';

import './customTab.css';

const CustomTab = ({ tabArray }) => {
    const { TabPane } = Tabs;
    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
    }
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
        <div className='tabContainer'>
            <div className='tableWeb'>
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