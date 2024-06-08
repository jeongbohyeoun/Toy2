import { ChangeEvent, ReactNode } from 'react';

export interface RadioProps {
  value: string | number;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  label: string;
  children: ReactNode;
}
