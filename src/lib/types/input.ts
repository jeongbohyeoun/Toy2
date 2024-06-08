import { ChangeEvent } from 'react';

export interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel';
  value: string | number;
  label?: string;
  name?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  color?: 'primary' | 'white';
}
