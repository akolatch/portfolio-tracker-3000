import React, { useState } from 'react';
import './TextInput.scss';
interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  name?: string;
  placeholder?: string;
  mandatory?: boolean;
  type?: string;
  validateForm?: (value: string) => boolean;
}
export function TextInput({
  onChange,
  value,
  label,
  placeholder = '',
  name,
  mandatory = true,
  type = 'text',
}: Props): React.ReactElement<any> {
  const [invalid, setInvalid] = useState(false);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mandatory && e.target.value === '') {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  return (
    <div className={invalid ? 'text-input-invalid' : 'text-input'}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name || label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
