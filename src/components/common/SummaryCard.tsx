import React from 'react';
import styled from 'styled-components';
import { calcAge } from '../../utils/calcAge';

interface SummaryCardProps {
  profile?: string;
  type: string;
  nickname: string;
  age: string;
  method?: string;
  gender?: string;
  content: string;
  fields: string[];
  onClick: () => void;
}

const SummaryCard = ({
  profile,
  type,
  nickname,
  age,
  method,
  gender,
  content,
  fields,
  onClick,
}: SummaryCardProps) => {
  return (
    <InputContainer onClick={onClick}>
      <WrapProfile>
        <ProfileImg
          src={profile === '' ? '/assets/common/profile.png' : `${profile}`}
          alt="profile"
        />
        <ProfileInfo>
          <p>
            <strong>{nickname}</strong> {type === 'dong' ? '동백' : '나리'}
            <Badge src={`/assets/common/badge-${type}.png`} />
          </p>
          <span>
            {calcAge(age)} | {type === 'nari' ? method : gender}
          </span>
        </ProfileInfo>
      </WrapProfile>
      {content && <WrapContent>{content}</WrapContent>}
      {fields && fields.length > 0 && (
        <WrapField>
          {fields.map((field, index) => (
            <Field key={index} $type={type}>
              {field}
            </Field>
          ))}
        </WrapField>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const WrapProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 3.4375rem;
  height: 3.4375rem;
  object-fit: cover;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  p {
    font-size: 1.125rem;
  }
  strong {
    font-size: 1.375rem;
    font-weight: 700;
  }
  span {
    font-size: 1.25rem;
  }
`;

const Badge = styled.img`
  margin-left: 0.2rem;
  width: 1.125rem;
`;

const WrapContent = styled.div`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  font-family: NanumSquare;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WrapField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
interface fieldType {
  $type: string;
}
const Field = styled.div<fieldType>`
  border-radius: 0.5rem;
  background: ${({ $type }) =>
    $type === 'nari' ? 'var(--Secondary-dong-2)' : 'var(--Secondary-nari-2)'};
  color: var(--Base-Deep-Gray, #5b5b5b);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
`;

export default SummaryCard;
