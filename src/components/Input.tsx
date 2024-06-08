import styled from 'styled-components';
import { InputProps } from '@/lib/types/input';
import { device } from '@/styles/media';

const Input = ({ color = 'primary', ...props }: InputProps) => {
  const {
    type,
    label,
    value,
    name,
    placeholder,
    error,
    errorMessage,
    disabled,
    readOnly,
    min,
    onChange,
    required,
    maxLength,
    pattern,
  } = props;
  return (
    <>
      <LabelStyled htmlFor={name}>{label}</LabelStyled>
      <InputStyled
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        min={min}
        onClick={(e) => e.currentTarget.focus()}
        pattern={pattern}
        maxLength={maxLength}
        color={color}
      />
      {error && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
};

const LabelStyled = styled.label`
  display: block;
  margin-bottom: 1.2rem;
  font-weight: 500;
`;

const InputStyled = styled.input`
  display: block;
  width: 100%;
  height: 5rem;
  padding: 0 1.5rem;
  color: var(--color-black);
  border-radius: 0.6rem;
  border: var(--border-gray);
  background-color: var(--color-white);

  &::placeholder {
    color: var(--color-gray-light);
  }

  &:focus {
    border: var(--border-primary);
  }

  &:read-only {
    border: var(--border-gray);
  }

  @media ${device.tablet} {
    height: 4.2rem;
  }
`;

const ErrorText = styled.p`
  .ErrorText {
    color: var(--chip-red);
    font-size: 1.4rem;
    margin-top: 0.06rem;
    margin-left: 1rem;
  }
`;

export default Input;
