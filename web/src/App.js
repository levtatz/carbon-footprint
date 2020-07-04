import React, { useState } from 'react';
import { Layout, Tabs, Row, Card, Col, Statistic } from 'antd';

import { DrivingForm } from './components/DrivingForm';
import { HousingForm } from './components/HousingForm';
import { TravelForm } from './components/TravelForm';

import 'antd/dist/antd.css';
import './App.css';

const { TabPane } = Tabs;

function App() {
  const [emissions, setEmissions] = useState(0);
  const [tabKey, setTabKey] = useState(1);

  const onTabChange = (tabKey) => {
    setTabKey(tabKey);
    setEmissions(0);
  };

  const { Header, Content } = Layout;
  return (
    <Layout className="layout">
      <Header>
        <h1>Carbon Emissions Calculator</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <Row gutter={32}>
            <Col span={12}>
              <Tabs defaultActiveKey={tabKey} onChange={onTabChange}>
                <TabPane tab="Housing" key="1">
                  <HousingForm setEmissions={setEmissions} />
                </TabPane>
                <TabPane tab="Commuting" key="2">
                  <TravelForm setEmissions={setEmissions} />
                </TabPane>
                <TabPane tab="Driving" key="3">
                  <DrivingForm setEmissions={setEmissions} />
                </TabPane>
              </Tabs>
            </Col>
            <Col span={12}>
              <Statistic
                title="Carbon Dioxide Emissions (lbs)"
                value={emissions.emissions}
                precision={2}
                style={{ margin: '3em auto' }}
              />
              {emissions && tabKey === '3' ? (
                <Card
                  title="Neutralize Your Drive                "
                  extra={
                    <a href="https://www.aspiration.com/" target="_blank">
                      More
                    </a>
                  }
                  style={{ maxWidth: 333 }}
                >
                  <p>
                    <a href="https://www.aspiration.com/" target="_blank">
                      Aspiration’s
                    </a>{' '}
                    Planet Protection™ feature tallies up the carbon output of
                    all of your gas purchases, then automatically buys offsets
                    to help counter the climate impact.
                  </p>
                </Card>
              ) : null}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
