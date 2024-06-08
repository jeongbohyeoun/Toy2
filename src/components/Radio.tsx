import styled from 'styled-components';
import iconCheck from '@/assets/images/icon-check.svg';
import { RadioProps } from '@/lib/types/radio';
import { device } from '@/styles/media';

const Radio = ({ children, value, name, defaultChecked = false, disabled = false, onChange }: RadioProps) => {
  return (
    <Label>
      <RadioInput
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </Label>
  );
};

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-right: 4rem;
  font-weight: 600;
  cursor: pointer;

  @media ${device.tablet} {
    margin-bottom: 1rem;
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: var(--border-gray);
  background-color: var(--color-white);
  border-radius: 50%;
  cursor: pointer;

  &:checked {
    background: url(${iconCheck}) no-repeat center / contain;
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
`;

export default Radio;
