import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormInputs } from '../../hooks/useFormInputs';
import { TextInput } from '../TextInput/TextInput';

export function AddPortfolio() {
  const [formValue, setFormValue, invalidForm] = useFormInputs({ name: '' });
  const history = useHistory();
  const submitForm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (invalidForm(formValue)) return;
    try {
      await fetch('/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
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
