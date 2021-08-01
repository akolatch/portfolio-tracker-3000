import React from 'react';
import { PortfolioValues } from '../../types';

interface Props {
  sums: PortfolioValues;
}
export function Totals({ sums }: Props): React.ReactElement {
  return (
    <table className='totals-table'>
      <tbody>
        <tr>
          <th>Total Paid:</th>
          <td>{`$${sums.paid.toFixed(2)}`}</td>
        </tr>
        <tr>
          <th>Current Value:</th>
          <td>{`$${sums.value.toFixed(2)}`}</td>
        </tr>
        <tr>
          <th>Total Profit:</th>
          <td>{`$${sums.profit.toFixed(2)}`}</td>
        </tr>
      </tbody>
    </table>
  );
}
