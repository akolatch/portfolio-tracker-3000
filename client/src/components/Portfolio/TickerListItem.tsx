import React, { useState } from 'react';
import { useFormInputs } from '../../hooks/useFormInputs';
import { useUpdateTicker } from '../../hooks/useUpdateTicker';
import { TickerData, TickerUpdates } from '../../types';
import TickerInput from './TickerInput';
import './TickerInput.scss';
interface Props {
  ticker: TickerData;
  deleteStock: (tickerId: number) => Promise<void>;
}

export function TickerListItem({
  ticker,
  deleteStock,
}: Props): React.ReactElement {
  const [formValue, setFormValue, invalidForm] = useFormInputs({
    pricePaid: ticker.pricePaid,
    numShares: `${ticker.numShares}`,
    purchaseDate: ticker.purchaseDate,
  });
  const [edit, setEdit] = useState(false);
  const { updateTicker, warning, setWarning } = useUpdateTicker();

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
    await updateTicker(ticker.id, updates, setEdit);
  };
  return (
    <li className='stock-ticker'>
      <span>{ticker.symbol}</span>
      <span>{ticker.purchaseDate}</span>
      <TickerInput
        onChange={setFormValue}
        value={formValue.purchaseDate}
        name='purchaseDate'
        label='Purchase Date'
        type='date'
        edit={edit}
      />
      <TickerInput
        onChange={setFormValue}
        value={formValue.numShares}
        name='numShares'
        label='Number of Shares'
        edit={edit}
      />
      <TickerInput
        onChange={setFormValue}
        value={formValue.pricePaid}
        name='pricePaid'
        label='Price Paid'
        edit={edit}
      />
      <span>{`$${ticker.currentPrice}`}</span>
      <span>{`$${parseFloat(ticker.currentPrice) * ticker.numShares}`}</span>
      <button onClick={handleEdit}>{edit ? 'Done ' : 'Edit'}</button>
      <button onClick={() => deleteStock(ticker.id)}>Delete</button>
    </li>
  );
}
