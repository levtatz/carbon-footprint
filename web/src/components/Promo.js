import React from 'react';
import { Card } from 'antd';

export const Promo = ({ emissions, tabKey }) => {
  if (!emissions) return null;

  switch (tabKey) {
    case '1':
      return (
        <Card
          title="Clean up your electricity"
          extra={
            <a href="https://www.arcadia.com/" target="_blank">
              More
            </a>
          }
          style={{ maxWidth: 333 }}
        >
          <p>
            Connect your utility account to{' '}
            <a href="https://www.arcadia.com/" target="_blank">
              Arcadia
            </a>{' '}
            to access clean energy and lower power bills in under two minutes.
          </p>
        </Card>
      );
    case '3':
      return (
        <Card
          title="Neutralize your drive"
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
            Planet Protection™ feature tallies up the carbon output of all of
            your gas purchases, then automatically buys offsets to help counter
            the climate impact.
          </p>
        </Card>
      );
    default:
      return null;
  }
};
