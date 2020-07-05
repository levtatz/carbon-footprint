import React from 'react';
import { Form, InputNumber, Button, Select } from 'antd';

import vehicleYears from '../data/vehicle-years.json';

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

export const DrivingForm = ({ addToChart, setEmissions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const query = new URLSearchParams(values);
    const response = await fetch(`/api/driving?${query}`);
    setEmissions(await response.json());
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <h3>Gasoline Passenger Cars</h3>
      <Form.Item
        name="year"
        label="Vehicle Year"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a vehicle year" showSearch allowClear>
          {vehicleYears.map((vehicleYear) => (
            <Option key={vehicleYear} value={vehicleYear}>
              {vehicleYear}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="mpg"
        label="Miles per gallon"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
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
          onClick={() => addToChart('Car ' + form.getFieldValue('mpg') + 'mpg')}
        >
          Chart & Compare
        </Button>
      </Form.Item>
    </Form>
  );
};
