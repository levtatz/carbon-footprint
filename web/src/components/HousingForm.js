import React from 'react';
import { Form, InputNumber, Button, Select } from 'antd';
import states from '../data/states-abbr.json';
import stateAvgs from '../data/state-avgs.json';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const HousingForm = ({ addToChart, setEmissions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const query = new URLSearchParams(values);
    const response = await fetch(`/api/housing?${query}`);
    setEmissions(await response.json());
  };

  const prefillKwhs = (value) =>
    form.setFieldsValue({ kwhs: stateAvgs[value] });

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="state"
        label="State"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a your state"
          onChange={prefillKwhs}
          allowClear
        >
          {states.map((state) => (
            <Option key={state.abbreviation} value={state.abbreviation}>
              {state.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="kwhs"
        label="KWhs"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Calculate Carbon Footprint
        </Button>
        <Button
          onClick={() => addToChart('House ' + form.getFieldValue('state'))}
        >
          Chart & Compare
        </Button>
      </Form.Item>
    </Form>
  );
};
