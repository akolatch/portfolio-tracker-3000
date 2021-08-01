import React from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  label: string;
  edit: boolean;
  type?: string;
}
export default function TickerInput({
  onChange,
  value,
  name,
  label,
  edit = false,
  type = 'number',
}: Props): React.ReactElement {
  return (
    <input
      className={edit ? `ticker-${type}-input-edit` : `ticker-${type}-input`}
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
