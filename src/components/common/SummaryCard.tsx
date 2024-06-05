import React from 'react';
import styled from 'styled-components';

interface SummaryCardProps {
  // profile: string;
  type: string;
  nickname: string;
  age: string;
  method: string;
  content: string;
  fields: string[];
}

const SummaryCard = ({
  // profile,
  type,
  nickname,
  age,
  method,
  content,
  fields,
}: SummaryCardProps) => {
  return (
    <InputContainer>
      <WrapProfile>
        <ProfileImg src={'/assets/common/profile.png'} alt="profile" />
        <ProfileInfo>
          <p>
            <strong>닉네임</strong> {type === 'nari' ? '나리' : '동백'}
            <Badge src={`/assets/common/badge-${type}.png`} />
          </p>
          <span>20대 | 대면</span>
        </ProfileInfo>
      </WrapProfile>
      <WrapContent>
        기후기술 창업대회 공모전 피드백 및 도와주실 전문가 구합니다.기후기술
        창업대회 공모전 피드백 및 도와주실 전문가 구합니다.
      </WrapContent>
      <WrapField>
        {fields.map((field, index) => (
          <Field key={index} $type={type}>
            {field}
          </Field>
        ))}
      </WrapField>
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
  font-family: 'NanumSquareR';

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WrapField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;
interface fieldType {
  $type: string;
}
const Field = styled.div<fieldType>`
  flex-grow: 1;
  border-radius: 0.5rem;
  background: ${({ $type }) =>
    $type === 'dong' ? 'var(--Secondary-dong-2)' : 'var(--Secondary-nari-2)'};
  color: #414040;
  font-family: 'NanumSquareR';
  font-weight: 400;
  text-align: center;
  font-size: 1.375rem;
  padding: 0.5rem;
`;

export default SummaryCard;
