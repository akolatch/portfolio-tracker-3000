import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormInputs } from '../../hooks/useFormInputs';
import { createPortfolio } from '../../lib/fetch';
import { FormInput } from '../FormInput/FormInput';

export function AddPortfolio() {
  const [formValue, setFormValue, invalidForm] = useFormInputs({ name: '' });
  const [warning, setWarning] = useState('');
  const history = useHistory();
  const submitForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (invalidForm(formValue)) {
      setWarning('Please enter a name for the portfolio');
      return;
    }
    try {
      await createPortfolio(formValue);
      setWarning('');
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form action='submit' data-testid='add-portfolio'>
      <h2>New Portfolio</h2>
      <FormInput
        onChange={setFormValue}
        label='Name'
        name='name'
        value={formValue.name}
      />
      {warning && (
        <p className='warning' data-testid='warning'>
          {warning}
        </p>
      )}
      <input
        type='submit'
        value='Submit'
        onClick={submitForm}
        data-testid='submit-button'
      />
    </form>
  );
}
