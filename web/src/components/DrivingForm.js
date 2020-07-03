import React from 'react';
import { Form, InputNumber, Button, Select } from 'antd';

const { Option } = Select;

const vehicleYears = [
  1973,
  1974,
  1975,
  1976,
  1977,
  1978,
  1979,
  1980,
  1981,
  1982,
  1983,
  1984,
  1993,
  1994,
  1995,
  1996,
  1997,
  1998,
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
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

export const DrivingForm = ({ setEmissions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const query = new URLSearchParams(values);
    const response = await fetch(`/api/driving?${query}`);
    setEmissions(await response.json());
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <h2>Gasoline Passenger Cars</h2>
      <Form.Item
        name="year"
        label="Vehicle Year"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a vehicle type" allowClear>
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
      </Form.Item>
    </Form>
  );
};
