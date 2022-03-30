/* eslint-disable react-hooks/rules-of-hooks */
import react, { useState } from 'react';
import { Input, DatePicker, Select, Radio, Checkbox } from 'antd';

export const getInput = (info) => {
    console.log(info, 'info')
    const { Option } = Select;
    const [formList, setFormList] = useState({});

    const handleChange = (e, validation) => {
        const { name, value } = e.target;

        setFormList({
            ...formList,
            [name]: value,
        });
    }

    switch (info.type) {
        case 'text':
            return <div>
                <Input name={info.name} placeholder={info.labelName} onChange={(e) => handleChange(e, info.validation)} type={info.type} />
            </div>
        case 'number':
            return <div>
                <Input name={info.name} placeholder={info.labelName} onChange={(e) => handleChange(e, info.validation)} type={info.type} />
            </div>
        case 'date':
            return <DatePicker name={info.name} onChange={handleChange} type={info.type} />
        case 'select':
            return <Select defaultValue={info.labelName} onChange={handleChange} name={info.name} style={{ width: 120 }} >
                {info.arrVal.map((val) => {
                    return <Option value={val}>{val}</Option>
                })}
            </Select>
        case 'radio':
            return <Radio.Group value={2} name={info.name} onChange={handleChange}>
                {info.arrVal.map((val) => {
                    return <Radio value={val}>{val}</Radio>
                })}
            </Radio.Group>
        case 'checkbox':
            return <Checkbox name={info.name} onChange={handleChange}>Checkbox</Checkbox>
        default:
            return <Input placeholder={info.labelName} type="text" />
    }
    // case 
}
