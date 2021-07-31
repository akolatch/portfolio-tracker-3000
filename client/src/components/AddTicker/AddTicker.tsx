import React, { useState } from 'react';
import { useFormInputs } from '../../hooks/useFormInputs';
import { TextInput } from '../TextInput/TextInput';

interface Props {
  portfolioId: number;
  closeAddForm: () => void;
}

export function AddTicker({
  portfolioId,
  closeAddForm,
}: Props): React.ReactElement {
  const [formValue, setFormValue, invalidForm] = useFormInputs({
    ticker: '',
    price: '0',
    shares: '0',
  });
  const [warning, setWarning] = useState('');

  const submitForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (invalidForm(formValue)) {
      setWarning('Please fill out all fields');
      return;
    }
    const newStock = {
      ticker: formValue.ticker,
      price: parseFloat(formValue.price),
      shares: parseInt(formValue.shares, 10),
    };
    const result = await fetch(`/portfolio/${portfolioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStock),
    });
    if (result.status === 404) {
      setWarning('Stock Symbol not Found');
      return;
    }
    if (result.status === 400) {
      const data = await result.json();
      console.log(data);
      setWarning('Stock Symbol already exists');
      return;
    }
    closeAddForm();
  };

  return (
    <div>
      <h1>Add Ticker</h1>
      <form action='submit'>
        <TextInput
          onChange={setFormValue}
          label='Stock Symbol'
          placeholder='IBM'
          name='ticker'
          value={formValue.ticker}
        />
        <TextInput
          onChange={setFormValue}
          label='Price Paid'
          placeholder='100.00'
          name='price'
          value={formValue.price}
          type='number'
        />
        <TextInput
          onChange={setFormValue}
          label='Number of Shares'
          placeholder='20'
          name='shares'
          value={formValue.shares}
          type='number'
        />
        <input type='date' />
        <input type='submit' value='Add Stock' onClick={submitForm} />
        {warning && <p>{warning}</p>}
      </form>
    </div>
  );
}
