import React from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import FileAddButton from '../../components/register/FileAddButton';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import useCareerItemState from '../../store/CareerItemState';
import CareerDetail from './../../components/common/CareerDetail';

const RegisterProfileCareerPage = () => {
  const { careers } = useCareerItemState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCareers = async () => {
  //     try {
  //       const response = await instance.get('/career/item/list');
  //       setCareers(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch careers from server', error);
  //     }
  //   };
  //   fetchCareers();
  // }, [setCareers]);

  // const handleRemoveCareer = async (careerId) => {
  //   try {
  //     await instance.delete('/career/item', careerId );
  //     removeCareer(careerId);
  //   } catch (error) {
  //     console.error('Failed to remove career', error);
  //   }
  // };
  const onDelete = () => {};
  // const calculateTotalPeriod = (): string => {
  //   let totalYears = 0;
  //   let totalMonths = 0;

  //   careers.forEach((career) => {
  //     const startYear = career.startYear;
  //     const startMonth = career.startMonth;
  //     const endYear = career.endYear;
  //     const endMonth = career.endMonth;

  //     let years = endYear - startYear;
  //     let months = endMonth - startMonth;

  //     if (months < 0) {
  //       years -= 1;
  //       months += 12;
  //     }

  //     totalYears += years;
  //     totalMonths += months;
  //   });

  //   totalYears += Math.floor(totalMonths / 12);
  //   totalMonths = totalMonths % 12;

  //   return `총 경력 ${totalYears}년 ${totalMonths}개월`;
  // };

  const navigateToAddPage = () => {
    navigate('/register/profile/career/add');
  };

  const navigateToRegisterProfile = () => {
    navigate('/home');
  };
  const navigateToRegisterProfileIntroduction = () => {
    navigate('/register/profile/introduction');
  };

  return (
    <WrapContent>
      <ButtonWrap onClick={navigateToRegisterProfile}>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={0} type={'dong'} />
      <CategoryText>{`동백님의 경력을 알려주세요!`}</CategoryText>
      <TotalCareer>
        <img src="/assets/home/career-profile-dong.svg" alt="프로필이미지" />
        <TotalCareerText></TotalCareerText>
      </TotalCareer>
      {careers.map((career) => (
        <CareerDetail
          key={career.title}
          title={career.title}
          startYear={career.startYear}
          startMonth={career.startMonth}
          endYear={career.endYear}
          endMonth={career.endMonth}
          content={career.content}
          onDelete={() => onDelete}
        />
      ))}
      <ButtonBox onClick={navigateToAddPage}>
        <FileAddButton addText={'경력 추가'}></FileAddButton>
      </ButtonBox>
      <LineStyle />
      <CategoryText>경력증명서</CategoryText>
      <HelpTextBox>
        <HelpText>{`·증빙자료를 첨부하시면 담당자 검토 후,\n확인마크`}</HelpText>
        <img src="/assets/common/certification-mark-dong.svg" alt="확인마크" />
        <HelpText>{`를 달아드려요.\n·첨부한 자료는 나리에게 노출되지 않고,\n담당자만 열람 가능해요.`}</HelpText>
      </HelpTextBox>
      <FileAddButton addText={'파일 추가'}></FileAddButton>

      <GapButton />
      <WrapButtonContainer>
        <WrapButton>
          <Button
            type={'dong'}
            disabled={false}
            children={'다음'}
            onClick={navigateToRegisterProfileIntroduction}
          ></Button>
        </WrapButton>
      </WrapButtonContainer>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  float: right;
  width: 5.7rem;
  height: 2.2rem;
  flex-shrink: 0;
  margin-bottom: 1.63rem;
`;

const CategoryText = styled.div`
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03rem;
  margin-top: 2rem;
  margin-bottom: 1.56rem;
`;

const TotalCareer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const TotalCareerText = styled.div`
  color: var(--Primary-dong, #ff314a);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonBox = styled.div``;

const LineStyle = styled.div`
  width: 100%;
  left: 0;
  height: 0.625rem;
  background: #ebeceb;
  position: absolute;
  margin-top: 3.3rem;
  margin-bottom: 3.3rem;
`;

const HelpTextBox = styled.div`
  width: 100%;
  height: 8.3125rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid var(--Primary-dong, #ff314a);
  padding: 1.3rem 1.2rem 1rem 1.2rem;
`;

const HelpText = styled.span`
  color: var(--Primary-dong, #ff314a);
  font-family: NanumSquare;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: pre;
`;

const GapButton = styled.div`
  margin-bottom: 8rem;
`;

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default RegisterProfileCareerPage;
