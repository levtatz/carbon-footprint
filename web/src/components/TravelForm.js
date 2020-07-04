import React from 'react';
import { Form, InputNumber, Button, Select } from 'antd';

const { Option } = Select;

const vehicleTypes = [
  'Passenger Car',
  'Light-Duty Truck',
  'Motorcycle',
  'Intercity Rail - Amtrak',
  'Commuter Rail',
  'Transit Rail (i.e. Subway, Tram)',
  'Bus',
  'Air Travel - Short Haul (< 300 miles)',
  'Air Travel - Medium Haul (>= 300 miles, < 2300 miles)',
  'Air Travel - Long Haul (>= 2300 miles)',
];

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

export const TravelForm = ({ addToChart, setEmissions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const query = new URLSearchParams(values);
    const response = await fetch(`/api/commuting?${query}`);
    setEmissions(await response.json());
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="type"
        label="Vehicle"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a vehicle type" allowClear>
          {vehicleTypes.map((vehicleType) => (
            <Option key={vehicleType} value={vehicleType}>
              {vehicleType}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="miles"
        label="Miles"
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
          onClick={() => addToChart('Commute ' + form.getFieldValue('type'))}
        >
          Chart & Compare
        </Button>
      </Form.Item>
    </Form>
  );
};
