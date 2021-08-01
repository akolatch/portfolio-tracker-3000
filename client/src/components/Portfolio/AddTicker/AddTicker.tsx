import React from 'react';
import { useFormInputs } from '../../../hooks/useFormInputs';
import { useCreateNewTicker } from '../../../hooks/useCreateNewTicker';
import { NewTicker } from '../../../types';
import { TextInput } from '../../TextInput/TextInput';

interface Props {
  portfolioId: number;
  closeAddForm: () => void;
}

export function AddTicker({
  portfolioId,
  closeAddForm,
}: Props): React.ReactElement {
  const [formValue, setFormValue, invalidForm] = useFormInputs({
    symbol: '',
    pricePaid: '0',
    numShares: '0',
    purchaseDate: '',
  });
  const { postNewTicker, warning, setWarning } = useCreateNewTicker();

  const submitForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (invalidForm(formValue)) {
      setWarning('Please fill out all fields');
      return;
    }

    const newStock: NewTicker = {
      symbol: formValue.symbol,
      pricePaid: parseFloat(formValue.pricePaid),
      numShares: parseInt(formValue.numShares, 10),
      purchaseDate: formValue.purchaseDate,
    };
    await postNewTicker(portfolioId, newStock, closeAddForm);
  };

  return (
    <div className='add-ticker-form'>
      <h1>Add Ticker</h1>
      <form action='submit'>
        <TextInput
          onChange={setFormValue}
          label='Stock Symbol'
          placeholder='IBM'
          name='symbol'
          value={formValue.symbol}
        />
        <TextInput
          onChange={setFormValue}
          label='Price Paid'
          placeholder='100.00'
          name='pricePaid'
          value={formValue.pricePaid}
          type='number'
        />
        <TextInput
          onChange={setFormValue}
          label='Number of Shares'
          placeholder='20'
          name='numShares'
          value={formValue.numShares}
          type='number'
        />
        <TextInput
          onChange={setFormValue}
          label='Purchase Date'
          placeholder=''
          name='purchaseDate'
          value={formValue.purchaseDate}
          type='date'
        />
        {warning && <p className='warning'>{warning}</p>}
        <input type='submit' value='Add Stock' onClick={submitForm} />
      </form>
    </div>
  );
}
