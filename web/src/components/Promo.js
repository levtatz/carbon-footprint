import React from 'react';
import { Card } from 'antd';

export const Promo = ({ emissions, tabKey }) =>
  emissions && tabKey === '3' ? (
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
        Planet Protection™ feature tallies up the carbon output of all of your
        gas purchases, then automatically buys offsets to help counter the
        climate impact.
      </p>
    </Card>
  ) : null;
