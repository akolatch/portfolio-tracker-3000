import React from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  label: string;
  edit: boolean;
  type?: string;
  validateForm?: (value: string) => boolean;
}
export default function TickerInput({
  onChange,
  value,
  name,
  label,
  edit = false,
  type = 'number',
}: Props): React.ReactElement<any> {
  return (
    <input
      className={edit ? 'ticker-input-edit' : 'ticker-input'}
      type={type}
      aria-label={label}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={label}
      disabled={!edit}
    />
  );
}
