import React from 'react';
import styled from 'styled-components';

interface ApplicationProps {
  userType: string;
  profile: string;
  nickname: string;
  title?: string;
  gender?: string;
  birthyear?: string;
  onClick?: () => void;
}
const ApplicationCard: React.FC<ApplicationProps> = ({
  userType,
  profile,
  nickname,
  gender,
  birthyear,
  title,
  onClick,
}) => {
  // gender 값에 따라 성별 텍스트 설정
  const genderText = gender === 'F' || gender === '여성' ? '여성' : '남성';

  return (
    <>
      <CardContainer onClick={onClick}>
        <img src={profile} alt="프로필이미지" />
        {userType === 'dong' ? (
          <div className="recruitInfo">
            <p>{nickname} 나리</p>
            <span>{title}</span>
          </div>
        ) : (
          <div className="recruitInfo">
            <p>{nickname} 동백</p>
            {/* 태그 */}
            <Tags>
              <Tag $type={'dong'}>{genderText}</Tag>
              <Tag $type={'dong'}>{birthyear}</Tag>
            </Tags>
          </div>
        )}
      </CardContainer>
    </>
  );
};
const CardContainer = styled.div`
  flex: 0 0 auto; /* 카드가 축소되지 않고 원래 크기를 유지 */
  width: 85%; /* 각 카드의 고정 너비 */
  height: 5rem;
  border-radius: 0.75rem;
  border: 1px solid #ebeceb;
  background: #fff;
  box-shadow: 2px 1px 3px 0px hsla(0, 0%, 0%, 0.25);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  align-items: center;
  display: flex;
  flex-direction: row;

  img {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    object-fit: cover;
  }
  .recruitInfo {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-left: 0.6rem;
    width: calc(100% - 4.5rem); /* 이미지 옆에 여유 공간 확보 */
    p {
      color: #000;
      font-family: NanumSquare;
      font-size: 1.25rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      overflow: hidden;
      color: #5b5b5b;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: NanumSquare;
      font-size: 1.125rem;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface tagType {
  $type: string;
}
const Tag = styled.div<tagType>`
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

export default ApplicationCard;
