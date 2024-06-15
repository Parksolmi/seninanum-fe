import React from 'react';
import styled from 'styled-components';

// 작성한 구인글 수, 지원자 수, 이번 달 등록된 구인글 수, 구인글 제목
interface RecruitData {
  myRecruit: number;
  applicantCount?: number;
  RecruitThisMonth?: number;
  recruitTitle?: string;
}

const MyRecruitProgress: React.FC<RecruitData> = ({
  myRecruit,
  applicantCount,
  RecruitThisMonth,
  recruitTitle,
}) => {
  return (
    <BoxContainer>
      {/* 작성한 구인글이 없는 경우-> 구인글 작성하기 */}
      {myRecruit === 0 ? (
        <>
          <ManagementBox>
            <ProfileBox>
              <MyRecruitManagementText>구인글 작성하기</MyRecruitManagementText>
              <MoreIconBox>
                <img
                  src={
                    process.env.PUBLIC_URL + 'assets/home/right-button-nari.svg'
                  }
                  alt="작성하기"
                />
              </MoreIconBox>
            </ProfileBox>
            <RecruitTitleText>
              구인글을 작성하면
              <br /> 나에게 맞는 동백님을 추천받을 수 있어요!
            </RecruitTitleText>
          </ManagementBox>
          <TextBox>
            <ApplyText>이번 달 등록된 구인글 수</ApplyText>
            <NumberTextBox>
              <ApplyNumber>{RecruitThisMonth}개</ApplyNumber>
              {/* <MoreButtonBox>
                <MoreIcon
                  src={process.env.PUBLIC_URL + '/assets/common/more-icon.svg'}
                ></MoreIcon>
              </MoreButtonBox> */}
            </NumberTextBox>
          </TextBox>
        </>
      ) : (
        <>
          <ManagementBox>
            <ProfileBox>
              <MyRecruitManagementText>내 구인글 관리</MyRecruitManagementText>
              <MoreIconBox>
                <img
                  src={
                    process.env.PUBLIC_URL + 'assets/home/right-button-nari.svg'
                  }
                  alt="더보기"
                />
              </MoreIconBox>
            </ProfileBox>
            <RecruitTitleText>{recruitTitle}</RecruitTitleText>
          </ManagementBox>
          <TextBox>
            <ApplyText>내 구인글에 지원한 동백님</ApplyText>
            <NumberTextBox>
              <ApplyNumber>{applicantCount}명</ApplyNumber>
            </NumberTextBox>
          </TextBox>
        </>
      )}
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* 임시 */
  /* margin-bottom: 5rem; */
  z-index: 1;
`;
const ManagementBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 0.6875rem 4.4375rem 0rem 0rem;
  background: var(--Base-White, #fff);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  padding: 0.8rem 1.6rem 0.8rem 0.8rem;
`;
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.7rem;
`;

const MyRecruitManagementText = styled.div`
  color: var(--Primary-nari-text, #f48400);
  font-family: 'Nanum_SquareR';
  font-size: 1.375rem;
  font-weight: 700;
  z-index: 3;
  margin-top: 0.2rem;
`;

const MoreIconBox = styled.div`
  width: 0.55363rem;
  height: 1rem;
  flex-shrink: 0;
  stroke-width: 2px;
`;

const RecruitTitleText = styled.div`
  width: 21rem;
  font-family: Nanum_Square;
  font-size: 1.125rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2rem;
`;

const TextBox = styled.div`
  width: 100%;
  height: 3.125rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 0.6875rem 0.6875rem;
  background: var(--Primary-nari, #ffaa0e);
  /* Shadow_dong */
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
  display: flex;
  flex-direction: row;
  padding: 0.8rem;
  align-items: center;
  justify-content: space-between;
`;

const NumberTextBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ApplyText = styled.div`
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-right: 4.3rem;
`;

const ApplyNumber = styled.div`
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const MoreButtonBox = styled.button`
//   display: flex;
//   width: 1.5rem;
//   height: 1.4375rem;
//   padding: 0.375rem 0rem 0.3125rem 0rem;
//   justify-content: center;
//   align-items: center;
//   flex-shrink: 0;
//   background: transparent;
//   border: transparent;
// `;

// const MoreIcon = styled.img`
//   width: 0.375rem;
//   height: 0.75rem;
//   flex-shrink: 0;
// `;

export default MyRecruitProgress;
