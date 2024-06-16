import React from 'react';
import styled from 'styled-components';

interface DetailCardProps {
  // profile: string;
  type: string;
  // nickname: string;
  // age: string;
  // method: string;
  // content: string;
  fields: string[];
}

const DetailCard = ({
  // profile,
  type,
  // nickname,
  // age,
  // method,
  // content,
  fields,
}: DetailCardProps) => {
  return (
    <InputContainer>
      <WrapProfile>
        <ProfileInfo>
          <span>닉네임 {type === 'dong' ? '동백' : '나리'} | 20대</span>
        </ProfileInfo>
      </WrapProfile>
      <WrapTitle>
        기후기술 창업대회 공모전 피드백 및 도와주실 전문가 구합니다. 기후기술
        창업대회 공모전 피드백 및 도와주실 전문가 구합니다.
      </WrapTitle>
      <WrapContent>
        환경 문제를 어떻게 하면 기후기술로 녹여낼지가 고민입니다. 격주 수요일
        저녁에 만나서 피드백 주실 분을 찾습니다.
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

const WrapTitle = styled.div`
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

const WrapContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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

export default DetailCard;
