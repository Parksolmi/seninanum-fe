import GlobalStyle from './styles/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import NavLayout from './layouts/NavLayout';
import ChatIndexPage from './pages/chat/ChatIndexPage';
import CommunityIndexPage from './pages/community/CommunityIndexPage';
import HomeIndexPage from './pages/home/HomeIndexPage';
import MyIndexPage from './pages/mypage/MyIndexPage';
import ChooseTypePage from './pages/signup/ChooseTypePage';
import AgreePolicyPage from './pages/signup/AgreePolicyPage';
import RegisterProfilePage from './pages/signup/RegisterProfilePage';
import SignupIndexPage from './pages/signup/SignupIndexPage';
import KakaoAuthHandle from './pages/signup/KakaoAuthHandle';
import RegisterRecruitFieldPage from './pages/recruit/RegisterRecruitFieldPage';
import RegisterRecruitMethodPage from './pages/recruit/RegisterRecruitMethodPage';
import RegisterRecruitContentPage from './pages/recruit/RegisterRecruitContentPage';
import RegisterProfileCareerPage from './pages/career/RegisterProfileCareerPage';
import RegisterProfileCareerAddPage from './pages/career/RegisterProfileCareerAddPage';
import RegisterProfileConditionPage from './pages/career/RegisterProfileConditionPage';
import ViewRecruitList from './pages/recruit/ViewRecruitList';
import ViewRecruitDetail from './pages/recruit/ViewRecruitDetail';
import ChatPage from './pages/chat/ChatPage';
import ViewProfileDong from './pages/profile/ViewProfileDong';
import WalkThroughIndexPage from './pages/walkthrough/WalkThroughIndexPage';
import RegisterProfileCertificatePage from './pages/career/RegisterProfileCertificatePage';
import ViewMyProfileDongPage from './pages/mypage/ViewMyProfileDongPage';
import ViewMyProfileNariPage from './pages/mypage/ViewMyProfileNariPage';
import UpdateMyInfoPage from './pages/mypage/UpdateMyInfoPage';
import CompleteSignupPage from './pages/signup/CompleteSignupPage';
import ViewProfileNari from './pages/profile/ViewProfileNari';
import MatchFilterNariPage from './pages/filter/MatchFilterNariPage';
import ManageMyRecruit from './pages/manage/ManageMyRecruit';
import ManageMyApplication from './pages/manage/ManageMyApplication';
import ViewMyRecruitDetail from './pages/recruit/ViewMyRecruitDetail';
import ViewMyApplicantsList from './pages/match/ViewMyApplicantsList';
import MatchIndexPage from './pages/match/MatchIndexPage';
import ProgressLayoutDong from './layouts/ProgressLayoutDong';
import ProgressLayoutNari from './layouts/ProgressLayoutNari';
import RegisterProfileFieldPage from './pages/career/RegisterProfileFieldPage';
import WriteFreeBoard from './pages/community/WriteFreeBoard';
import WriteAdviceBoard from './pages/community/WriteAdviceBoard';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignupIndexPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandle />} />
        <Route path="/signup/usertype" element={<ChooseTypePage />} />
        <Route path="/signup/policy" element={<AgreePolicyPage />} />
        <Route path="/signup/profile" element={<RegisterProfilePage />} />
        <Route path="/signup/complete" element={<CompleteSignupPage />} />

        <Route path="/walkthrough" element={<WalkThroughIndexPage />} />
        {/* 구인글 등록 */}
        <Route path="/register/recruit" element={<ProgressLayoutNari />}>
          <Route path="field" element={<RegisterRecruitFieldPage />} />
          <Route path="method" element={<RegisterRecruitMethodPage />} />
          <Route path="content" element={<RegisterRecruitContentPage />} />
        </Route>
        {/* 구인글 조회 */}
        <Route path="/view/recruit/list" element={<ViewRecruitList />} />
        <Route
          path="/view/recruit/:recruitId"
          element={<ViewRecruitDetail />}
        />
        {/* 구인글 수정 */}
        <Route
          path="/modify/recruit/:recruitId"
          element={<ProgressLayoutNari />}
        >
          <Route path="field" element={<RegisterRecruitFieldPage />} />
          <Route path="method" element={<RegisterRecruitMethodPage />} />
          <Route path="content" element={<RegisterRecruitContentPage />} />
        </Route>
        {/* 경력 프로필 등록 */}
        <Route path="/register/profile" element={<ProgressLayoutDong />}>
          <Route
            path="career/:careerProfileId"
            element={<RegisterProfileCareerPage />}
          />
          <Route
            path="field/:careerProfileId"
            element={<RegisterProfileFieldPage />}
          />
          <Route
            path="condition/:careerProfileId"
            element={<RegisterProfileConditionPage />}
          />
        </Route>
        <Route
          path="/register/profile/career/add"
          element={<RegisterProfileCareerAddPage />}
        />
        <Route
          path="/register/profile/certificate"
          element={<RegisterProfileCertificatePage />}
        />
        {/* 매칭 상세조건 조회 */}
        <Route path="/match/field" element={<MatchFilterNariPage />} />
        {/* 프로필 조회 */}
        <Route
          path="/view/dongprofile/:profileId" //수정 필요
          element={<ViewProfileDong />}
        />
        <Route
          path="/view/nariprofile/:profileId"
          element={<ViewProfileNari />}
        />
        {/* 채팅 */}
        <Route path="/chatroom/:chatRoomId" element={<ChatPage />} />

        {/* 마이페이지 */}
        <Route
          path="/view/myprofile/dong"
          element={<ViewMyProfileDongPage />}
        />
        <Route
          path="/view/myprofile/nari"
          element={<ViewMyProfileNariPage />}
        />
        <Route path="/update/myinfo" element={<UpdateMyInfoPage />} />
        {/* 구인글 관리 */}
        <Route path="/manage/myrecruit" element={<ManageMyRecruit />} />
        <Route
          path="/view/myrecruit/:recruitId"
          element={<ViewMyRecruitDetail />}
        />
        <Route path="/view/myapplicants" element={<ViewMyApplicantsList />} />
        {/* 지원내역 관리 */}
        <Route path="/manage/myapplication" element={<ManageMyApplication />} />
        {/* 게시판 글쓰기 */}
        <Route path="/write/freeboard" element={<WriteFreeBoard />} />
        <Route path="/write/adviceboard" element={<WriteAdviceBoard />} />
        <Route element={<NavLayout />}>
          <Route path="/home" element={<HomeIndexPage />} />
          <Route path="/match" element={<MatchIndexPage />} />
          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/community" element={<CommunityIndexPage />} />
          <Route path="/mypage" element={<MyIndexPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
