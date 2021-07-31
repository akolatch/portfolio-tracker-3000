import { useState, ChangeEvent } from 'react';

type InputFields = { [key: string]: string };

export function useTextInputs(
  initialState: InputFields
): [InputFields, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [inputFields, setInputFields] = useState<InputFields>(initialState);

  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return [inputFields, onchange];
}
