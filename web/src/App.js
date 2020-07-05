import React, { useState } from 'react';
import { Layout, Tabs, Row, Card, Col, Statistic } from 'antd';

import { DrivingForm } from './components/DrivingForm';
import { HousingForm } from './components/HousingForm';
import { TravelForm } from './components/TravelForm';
import { Chart } from './components/chart';
import { Promo } from './components/Promo';

import 'antd/dist/antd.css';
import './App.css';

const { TabPane } = Tabs;

function App() {
  const [emissions, setEmissions] = useState(0);
  const [tabKey, setTabKey] = useState(1);
  const [chartData, setChartData] = useState([]);

  const onTabChange = (tabKey) => {
    setTabKey(tabKey);
    setEmissions(0);
  };

  const addToChart = (category) => {
    setChartData([...chartData, { category, ...emissions }]);
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
                  <HousingForm
                    addToChart={addToChart}
                    setEmissions={setEmissions}
                  />
                </TabPane>
                <TabPane tab="Commuting" key="2">
                  <TravelForm
                    addToChart={addToChart}
                    setEmissions={setEmissions}
                  />
                </TabPane>
                <TabPane tab="Driving" key="3">
                  <DrivingForm
                    addToChart={addToChart}
                    setEmissions={setEmissions}
                  />
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
              <Promo emissions={emissions} tabKey={tabKey} />
            </Col>
          </Row>
          <Chart data={chartData} />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
