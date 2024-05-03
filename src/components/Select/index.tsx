import { ChangeEvent, ReactNode } from 'react';
import style from './style.module.scss'

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;  
}

export function Select({ options, value, onChange }: SelectProps) {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }
  return (
    <select className={style.select} value={value} onChange={handleChange}>
      {
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      }      
    </select>
  )
}