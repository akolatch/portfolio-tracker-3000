import React from 'react';
import { useFormInputs } from '../../../hooks/useFormInputs';
import { useCreateNewTicker } from '../../../hooks/useCreateNewTicker';
import { NewTicker } from '../../../types';
import { FormInput } from '../../FormInput/FormInput';
import './AddTicker.scss';
interface Props {
  portfolioId: number;
  setPortfolioData: () => Promise<void>;
  setAddStock: (value: React.SetStateAction<boolean>) => void;
}

export function AddTicker({
  portfolioId,
  setAddStock,
  setPortfolioData,
}: Props): React.ReactElement {
  const [formValue, setFormValue, invalidForm] = useFormInputs({
    symbol: '',
    pricePaid: '0',
    numShares: '0',
    purchaseDate: '',
  });

  const { postNewTicker, warning, setWarning } = useCreateNewTicker();

  const successfulSubmission = () => {
    setPortfolioData();
    setWarning('');
    setAddStock(false);
  };
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
    await postNewTicker(portfolioId, newStock, successfulSubmission);
  };

  const closeModel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setAddStock(false);
    }
  };
  return (
    <div
      data-testid='add-ticker-container'
      className='add-ticker-container'
      onClick={closeModel}
    >
      <form data-testid='form' action='submit'>
        <h3>Add Ticker</h3>
        <FormInput
          onChange={setFormValue}
          label='Stock Symbol'
          placeholder='IBM'
          name='symbol'
          value={formValue.symbol}
        />
        <FormInput
          onChange={setFormValue}
          label='Price Paid'
          placeholder='100.00'
          name='pricePaid'
          value={formValue.pricePaid}
          type='number'
        />
        <FormInput
          onChange={setFormValue}
          label='Number of Shares'
          placeholder='20'
          name='numShares'
          value={formValue.numShares}
          type='number'
        />
        <FormInput
          onChange={setFormValue}
          label='Purchase Date'
          placeholder=''
          name='purchaseDate'
          value={formValue.purchaseDate}
          type='date'
        />
        {warning && <p className='warning'>{warning}</p>}
        <input type='submit' value='Add Stock' onClick={submitForm} />
        <button
          data-testid='close-button'
          className='button-secondary'
          onClick={closeModel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
