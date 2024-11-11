import React from 'react';
import styled from 'styled-components';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: any;
  error?: string;
  readonly userType: string | null;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  register,
  error,
  userType,
  ...inputProps
}) => {
  return (
    <InputContainer>
      <WrapLabel>
        <label>{label}</label>
        {error && <p>{error}</p>}
      </WrapLabel>
      <InputBox $userType={userType} {...inputProps} {...register} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WrapLabel = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    font-size: 1.4rem;
    font-weight: 600;
    font-family: Nanum_Square;
  }

  p {
    color: #f00;
    font-size: 1rem;
    font-weight: 400;
    font-family: NanumSquare;
    padding-top: 0.5rem;
  }
`;

const InputBox = styled.input<{ $userType: string | null }>`
  width: 100%;
  height: 3rem;
  border: 1px solid var(--Base-Deep-Gray);
  border-radius: 10px;
  font-weight: 700;
  font-family: Nanum_Square;
  font-size: 1.2rem;
  padding-left: 0.5rem;

  &::placeholder {
    font-weight: 300;
    line-height: 1rem;
    color: var(--Base-Deep-Gray);
  }

  &:focus {
    outline: none;
    border: ${({ $userType }) =>
      $userType === 'dong'
        ? '1.5px solid var(--Primary-dong)'
        : '1.5px solid var(--Primary-nari)'};
    border-radius: 0.8rem;
  }
`;

export default InputText;
