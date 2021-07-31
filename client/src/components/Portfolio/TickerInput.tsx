import React from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  edit: boolean;
  type?: string;
  validateForm?: (value: string) => boolean;
}
export default function TickerInput({
  onChange,
  value,
  name,
  edit = false,
  type = 'number',
}: Props): React.ReactElement<any> {
  return (
    <input
      type={type}
      aria-label={name}
      value={value}
      onChange={onChange}
      placeholder={name}
      disabled={!edit}
    />
  );
}
