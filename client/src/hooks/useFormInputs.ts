import { useState, ChangeEvent } from 'react';

type InputFields = { [key: string]: string };

export function useFormInputs(
  initialState: InputFields
): [
  InputFields,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (inputFields: InputFields) => boolean
] {
  const [inputFields, setInputFields] = useState<InputFields>(initialState);

  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const invalidForm = (inputFields: InputFields): boolean => {
    for (const key in inputFields) {
      if (inputFields[key] === '' || inputFields[key] === '0') {
        return true;
      }
    }
    return false;
  };
  return [inputFields, onchange, invalidForm];
}
