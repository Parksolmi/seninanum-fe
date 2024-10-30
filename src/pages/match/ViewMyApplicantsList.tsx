import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/instance';
import SummaryCard from '../../components/common/SummaryCard';

interface Applicant {
  profileId: number;
  nickname: string;
  gender: string;
  birthyear: string;
  introduce: string;
  field: string;
  profile: string;
}

interface Recruit {
  recruitId: number;
  title: string;
}

const ViewMyApplicantsList = () => {
  const navigate = useNavigate();
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [selectedRecruit, setSelectedRecruit] = useState<Recruit | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  //구인글 목록 조회
  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const res = await instance.get('application/list');
        const uniqueRecruits = removeDuplicateTitles(
          res.data.map((r: { recruitId: number; title: string }) => r)
        );
        // 구인글 목록을 최신순으로 정렬
        const sortedRecruits = uniqueRecruits.sort(
          (a, b) => b.recruitId - a.recruitId
        );
        setRecruits(sortedRecruits);

        // 가장 최신 구인글을 기본값으로 설정
        if (sortedRecruits.length > 0) {
          setSelectedRecruit(sortedRecruits[0]);
          fetchApplicants(sortedRecruits[0].recruitId);
        }
      } catch (error) {
        console.error('구인글 목록 조회 실패:', error);
      }
    };
    fetchRecruits();
  }, []);

  // 중복된 제목을 제거하는 함수
  const removeDuplicateTitles = (recruits: Recruit[]) => {
    const seenTitles = new Set();
    return recruits.filter((recruit) => {
      const duplicate = seenTitles.has(recruit.title);
      seenTitles.add(recruit.title);
      return !duplicate;
    });
  };

  // 선택한 구인글의 지원자 목록 조회
  const fetchApplicants = async (recruitId: number) => {
    try {
      const res = await instance.get(`application/list?recruitId=${recruitId}`);
      setApplicants(res.data);
    } catch (error) {
      console.error('지원자 목록 조회 실패:', error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleSelectRecruit = (recruit: Recruit) => {
    setSelectedRecruit(recruit);
    fetchApplicants(recruit.recruitId);
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownContainer>
        <SelectedRecruitBox onClick={toggleDropdown}>
          <TextContainer>
            {selectedRecruit ? selectedRecruit.title : '전체 구인글'}{' '}
          </TextContainer>
          <img
            src={
              isDropdownOpen
                ? '/assets/home/dropup-icon.svg'
                : '/assets/home/dropdown-icon.svg'
            }
            alt="dropicon"
          />
        </SelectedRecruitBox>

        {isDropdownOpen && (
          <Dropdown>
            {recruits.map((recruit, index) => (
              <React.Fragment key={index}>
                <DropdownItem onClick={() => handleSelectRecruit(recruit)}>
                  {recruit.title}
                </DropdownItem>
                {index < recruits.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Dropdown>
        )}
      </DropdownContainer>

      <WrapDongCards>
        {applicants.length > 0 ? (
          applicants.map((applicant) =>
            applicant.profileId ? (
              <SummaryCard
                key={applicant.profileId}
                type="dong"
                profile={applicant.profile}
                fields={applicant.field ? applicant.field.split(',') : []}
                nickname={applicant.nickname}
                content={applicant.introduce}
                age={applicant.birthyear}
                gender={
                  applicant.gender === 'F' || applicant.gender === '여성'
                    ? '여성'
                    : '남성'
                }
                onClick={() =>
                  navigate(`/view/dongprofile/${applicant.profileId}`)
                }
              />
            ) : (
              `지원자가 아직 없습니다.`
            )
          )
        ) : (
          <p>구인글이 없습니다.</p>
        )}
      </WrapDongCards>
    </>
  );
};

const DropdownContainer = styled.div`
  position: relative;
`;

const SelectedRecruitBox = styled.div`
  padding: 0.8rem 1.1rem;
  color: #5b5b5b;
  font-family: NanumSquare;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  border: 1px solid #5b5b5b;
  width: 100%;
  height: 3.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TextContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin-right: 0.5rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 13.6rem; //4개만 보이게
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 1.1rem;
  font-family: NanumSquare;
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 3.4rem;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Divider = styled.div`
  display: flex;
  width: 93%;
  height: 0;
  margin: auto;
  border-top: 1.5px solid #ebeceb;
  align-items: center;
  padding-top: 0.2rem;
`;

const WrapDongCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  white-space: pre;
`;

export default ViewMyApplicantsList;
