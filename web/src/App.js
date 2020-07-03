import React, { useState } from 'react';
import { Layout, Menu, Row, Col, Statistic } from 'antd';
import { TravelForm } from './components/TravelForm';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [emissions, setEmissions] = useState(0);

  const { Header, Content } = Layout;
  return (
    <Layout className="layout">
      <Header>
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">💼</Menu.Item>
          <Menu.Item key="2">🚗</Menu.Item>
          <Menu.Item key="3">🏠</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <Row gutter={16}>
            <Col span={12}>
              <TravelForm setEmissions={setEmissions} />
            </Col>
            <Col span={12}>
              <Statistic
                title="Carbon Dioxide Emissions (lbs)"
                value={emissions.emissions}
                precision={2}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
