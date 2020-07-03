import React from 'react';
import { Layout, Menu } from 'antd';
import { TravelForm } from './components/TravelForm';

import 'antd/dist/antd.css';
import './App.css';

function App() {
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
          <TravelForm />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
