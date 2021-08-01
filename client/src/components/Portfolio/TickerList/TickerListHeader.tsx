import React from 'react';

export function TickerListHeader(): React.ReactElement {
  return (
    <tr className='stock-ticker'>
      <th>SYMBOL</th>
      <th>Purchase Date</th>
      <th> Number of Shares</th>
      <th>Purchase Price</th>
      <th>Current Price</th>
      <th className='back-spacer'>Total</th>
    </tr>
  );
}
