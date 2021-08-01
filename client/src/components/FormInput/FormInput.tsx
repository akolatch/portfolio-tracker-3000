import React, { useState } from 'react';
import './FormInput.scss';
interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
}
export function FormInput({
  onChange,
  value,
  label,
  placeholder = '',
  name,
  type = 'text',
}: Props): React.ReactElement<any> {
  const [invalid, setInvalid] = useState(false);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || e.target.value === '0') {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  return (
    <div className={invalid ? 'text-input-invalid' : 'text-input'}>
      <label htmlFor={name}>{label}</label>
      <input
        data-testid={name}
        aria-label={label}
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
