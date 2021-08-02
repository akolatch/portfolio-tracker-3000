import React, { useState } from 'react';
import { useFormInputs } from '../../../hooks/useFormInputs';
import { useUpdateTicker } from '../../../hooks/useUpdateTicker';
import { TickerData, TickerUpdates } from '../../../types';
import TickerInput from './TickerInput';

interface Props {
  ticker: TickerData;
  deleteStock: (tickerId: number) => Promise<void>;
  setPortfolioData: () => Promise<void>;
}

export function TickerListItem({
  ticker,
  deleteStock,
  setPortfolioData,
}: Props): React.ReactElement {
  const [formValue, setFormValue, invalidForm] = useFormInputs({
    pricePaid: ticker.pricePaid,
    numShares: `${ticker.numShares}`,
    purchaseDate: ticker.purchaseDate,
  });
  const [edit, setEdit] = useState(false);
  const { updateTicker } = useUpdateTicker();

  const successfulUpdate = async () => {
    await setPortfolioData();
    setEdit(false);
  };

  const handleEdit = async () => {
    if (!edit) {
      setEdit(true);
      return;
    }
    if (invalidForm(formValue)) return;
    const updates: TickerUpdates = {
      pricePaid: parseFloat(formValue.pricePaid),
      numShares: parseInt(formValue.numShares, 10),
      purchaseDate: formValue.purchaseDate,
    };
    await updateTicker(ticker.id, updates, successfulUpdate);
  };

  return (
    <tr className='stock-ticker'>
      <td className='symbol' data-testid={ticker.symbol}>
        {ticker.symbol}
      </td>
      <td>
        <TickerInput
          onChange={setFormValue}
          value={formValue.purchaseDate}
          name='purchaseDate'
          label='Purchase Date'
          type='date'
          edit={edit}
        />
      </td>
      <td>
        <TickerInput
          onChange={setFormValue}
          value={formValue.numShares}
          name='numShares'
          label='Number of Shares'
          edit={edit}
        />
      </td>
      <td>
        $
        <TickerInput
          onChange={setFormValue}
          value={formValue.pricePaid}
          name='pricePaid'
          label='Price Paid'
          edit={edit}
        />
      </td>
      <td>{`$${ticker.currentPrice}`}</td>
      <td>{`$${(parseFloat(ticker.currentPrice) * ticker.numShares).toFixed(
        2
      )}`}</td>
      <td className='list-button'>
        <button
          data-testid='edit-button'
          className='button-main'
          onClick={handleEdit}
        >
          {edit ? 'Done ' : 'Edit'}
        </button>

        <button
          className='button-secondary'
          onClick={() => deleteStock(ticker.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
