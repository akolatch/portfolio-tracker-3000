import React from 'react';
import { useTextInputs } from '../../hooks/useTextInputs';
import { TextInput } from '../TextInput/TextInput';

export function AddPortfolio() {
  const [formValue, setFormValue] = useTextInputs({ name: '' });

  const submitForm = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (formValue.name.length === 0) return;
    fetch('/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    }).catch((err) => console.log(err));
  };

  return (
    <form action='submit'>
      <h3>New Portfolio</h3>
      <TextInput
        onChange={setFormValue}
        label='Name'
        name='name'
        value={formValue.name}
      />
      <input type='submit' value='Submit' onClick={submitForm} />
    </form>
  );
}
